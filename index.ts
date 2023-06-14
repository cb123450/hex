import { createWatchCompilerHost, visitNodes } from "typescript";

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('gameArea');
const ctx = canvas.getContext('2d');

const width: number = window.innerWidth;
const height: number = window.innerHeight;

canvas.width = width;
canvas.height = height;

//HEXAGON CONSTANTS
const hex_side: number = canvas.width/30.0; //11 by 11 board but divide by 14.0 for extra space
const hex_height: number = 2.0*hex_side; //from edge to opposite edge
const hex_width: number = Math.sqrt(3)*hex_side; //from corner to opposite corner

/*
ORIENTATION OF HEXAGON ON BOARD -> 
/\
||
\/
*/

/*
NW/\NE
 W||E
SW\/SE
*/
interface Dir {
    x: number;
    y: number;
}
class Dir {
    
    static NW = new Dir(-hex_width/2.0, -(hex_side/2.0) - hex_side);
    static NE = new Dir(-hex_width/2.0, -(hex_side/2.0) - hex_side);
    static E = new Dir(hex_width, 0.0);
    static SE = new Dir(hex_width/2.0, hex_side/2.0 + hex_side);
    static SW = new Dir(-hex_width/2.0, hex_side/2.0 + hex_side);
    static W = new Dir(-hex_width, 0.0);
    
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

/*
---center is [x, y] where x is the x-coord of the center 
of this tile and y is the y-coord of the center

---vertices is an array of the vertices making up the hexagon
of this tile
*/
interface Tile {
    center: Array<number>;
    vertices: Array<Array<number>>;
    get_center() : Array<number>;
    get_vertices() : Array<Array<number>>;
    hash() : string;
}
class Tile {
    constructor(center, vertices){
        this.center = center;
        this.vertices = vertices;
    }
    get_center(){
        return this.center;
    }
    get_vertices(){
        return this.vertices;
    }
    hash() : string{
        const center_str = this.center[0] + '_' + this.center[1];
        return center_str;
    }
}

/*
---node is a tile

---vertices is the set of vertices in a graph; it contains strings

--edges will be an adjacency list implemented with a hashmap. 
    --key is the string representing the center of the tile
    --value is a hashmap of its neighbors (Tile objects)

-There will be no collisions in any dictionary bc each tile has a unique center
-This graph is undirected
*/
interface Graph<Hashable, T> {
    vertices;
    adj_list;
}

class Graph<Hashable, T>{
    constructor(){
        this.vertices = new Map<Hashable, T>; 
        this.adj_list = new Map<Hashable, Map<Hashable, T>>();
    }

    /*
    ---curr_tile is the current Tile object
    ---adj_tile is the adjacent Tile object
    */
    addEdge(curr_tile, adj_tile){
        let curr_str = curr_tile.hash();
        let adj_str = adj_tile.hash();

        if (this.vertices.has(curr_str)){
            this.adj_list[curr_str][adj_str] = adj_tile;
        }
        else{
            this.vertices.set(curr_str, curr_tile);
            this.adj_list[curr_str] = new Map<Hashable, T>;
            this.adj_list[curr_str][adj_str] = adj_tile;
        }
    }

    addVertex(curr_tile){
        if (!this.vertices.has(curr_tile.hash())){
            this.vertices.set(curr_tile.hash(), curr_tile);
            this.adj_list[curr_tile.hash()] = new Map<Hashable, T>;
        }
    }
    
    getVertices() : Map<Hashable, T>{
        return this.vertices;
    }

    getAdjacencyList() : Map<Hashable, Map<Hashable, T>>{
        return this.adj_list;
    }
}

interface Queue<T> {
    items: Array<T>;
    first_item: number;
    next_item: number;
    num_elements: number;
}
class Queue<T> implements Queue<T>{
    constructor() {
        this.items = new Array<T>;
        this.first_item = 0;
        this.next_item = 0;
        this.num_elements = 0;
    }
    enqueue(item) {
        this.items[this.next_item] = item;
        this.next_item++;
        this.num_elements += 1.
    }
    dequeue() {
        if (this.first_item < this.next_item){
            const item = this.items[this.first_item];
            this.first_item++;
            this.num_elements -= 1;
            return item;
        }
    }
    size(){
        return this.num_elements;
    }
    peek() {
        return this.items[this.first_item];
    }
    get printQueue() {
        return this.items;
    }
}

/**************************************** */

//Game Loop
function drawGame(){
    clearScreen();
    let g : Graph<string, Tile> = createTiles();
    drawTiles(g);
}

function clearScreen(){
    if (ctx != null){
        ctx.fillStyle = "brown";
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }
}

function get_neighbors(point: Array<number>): Array<Array<number>> {
    let n = [point[0], point[1] - hex_height];
    let ne = [point[0] + (3.0/2.0)*(hex_side), point[1] - (hex_height/2.0)];
    let se = [ne[0], ne[1] + hex_height];
    let s = [n[0], point[1] + hex_height];
    let sw = [point[0] - (3.0/2.0)*(hex_side), se[1]];
    let nw = [sw[0], ne[1]];

    let ret = [n, ne, se, s, sw, nw];

    return ret;
}

//Returns a graph where the nodes are tiles
function createTiles() : Graph<string, Tile>{
    
    let start: Array<number> = [hex_width/2.0, hex_height/2.0];
    
    let start_tile: Tile = createTile(start);

    let g = new Graph<string, Tile>();

    g.addVertex(start_tile)

    return g; 
    
}

/*creates a single tile and returns it; takes in an array of two points
  n
nw/\ne 
sw||se
  \/
  s
*/
function createTile(center){
    const nw = [center[0] + -hex_width/2.0, center[1] + -hex_side/2.0];
    const n = [center[0] + 0.0 , center[1] + -hex_side];
    const ne = [center[0] + hex_width/2.0, center[1] + -hex_side/2.0];
    const se = [center[0] + hex_width/2.0, center[1] + hex_side/2.0];
    const s = [center[0] + 0.0, center[1] + hex_side];
    const sw = [center[0] + -hex_width/2.0, center[1] + hex_side/2.0];

    //array of arrays of doubles
    const vertices: Array<Array<number>> = [nw, n, ne, se, s, sw];
    const t = new Tile(center, vertices);
    return t; 
}


function drawTiles(points : Graph<string, Tile>){
    if (ctx != null){
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const tile_map : Map<string, Tile>= points.getVertices();

        const iterator1 = tile_map.values();

        let k = 0;
        while (k < tile_map.size){
            let t : Tile = iterator1.next().value;
            const vertices : Array<Array<number>> = t.get_vertices();
            
            let i = 0;
            while (i < vertices.length-1){
                ctx.moveTo(vertices[i][0], vertices[i][1]);
                ctx.lineTo(vertices[i+1][0], vertices[i+1][1])
                ctx.stroke();
                i += 1;
            }
            ctx.moveTo(vertices[i][0], vertices[i][1]);
            ctx.lineTo(vertices[0][0], vertices[0][1]);
            ctx.stroke();
            k += 1
        }
    }
}

drawGame();




