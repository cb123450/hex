import { timeStamp } from "console";
import { convertTypeAcquisitionFromJson, createWatchCompilerHost, isModuleBody, visitNodes } from "typescript";

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

var b = document.createElement("button");
var body = document.getElementsByTagName("body")[0];
//body.style.
b.innerHTML = "Button b";
body.appendChild(b);

//b.style.left = init_center[0] + 'px';
//b.style.top = init_center[1] + 'px';

b.addEventListener("click", function(){
    alert("did something");
});


var c = document.createElement("button");
var body = document.getElementsByTagName("body")[0];
//body.style.
c.innerHTML = "Button c";
body.appendChild(c);

//b.style.left = init_center[0] + 'px';
//b.style.top = init_center[1] + 'px';
c.style.left = "400px";

c.addEventListener("click", function(){
    alert("did something");
});

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

The directions refer to the direction to the adjacent neighbor
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

    getX() : number{
        return this.x;
    }

    getY() : number{
        return this.y;
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
    color : string;
    visited : boolean;
    get_center() : Array<number>;
    get_vertices() : Array<Array<number>>;
    hash() : string;
    get_visited() : boolean;
    visit();
    unvisit();
}
class Tile {
    constructor(center, vertices){
        this.center = center;
        this.vertices = vertices;
        this.color = "blue";
        this.visited = false;
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
    set_color(color : string){
        this.color = color;
    }
    get_color() : string{
        return this.color;
    }
    get_visited_flag() : boolean{
        return this.visited;
    }
    visit(){
        this.visited = true;
    } 
    unvisit(){
        this.visited = false;
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
    addEdge(curr_tile, adj_tile);
    addVertex(curr_tile);
    getVertices();
    getAdjacencyList();
    unvisit_all();
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

    unvisitAll(){
        let iter = this.vertices.values();
        while (iter.hasNext()){
            let t : Tile = iter.next();
            t.unvisit();
        }
        
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
    //changeColor(g);
}

function clearScreen(){
    if (ctx != null){
        ctx.fillStyle = "green";
        const w : number = 17 * hex_width;
        var h : number = 6 * hex_side + 6 * hex_height;
        ctx.fillRect(0,0, w, h);
    }
}

/* Test to see if I can change the tiles colors
*/
function changeColor(g: Graph<string, Tile>) {
    const q = new Queue<Tile>();
    let visited = new Set<string>();
    let adj_list : Map<string, Tile> = g.getVertices();

    let iterator = adj_list.values();

    let start_tile = iterator.next().value;

    q.enqueue(start_tile);
    visited.add(start_tile);
    //Run a BFS from 'start_tile'

    while (q.size() != 0){
        const t : Tile | undefined = q.dequeue();
        console.log("test")
        if (t != undefined){
            //color the vertex
            let vertices : number[][] = t.get_vertices();
            if (ctx != null){
                ctx.beginPath();
                
                let k = 0;
                while (k < vertices.length-1){
                    ctx.moveTo(vertices[k][0], vertices[k][1]);
                    ctx.lineTo(vertices[k+1][0], vertices[k+1][1]);
                    k += 1;
                }
                ctx.moveTo(vertices[vertices.length-1][0], vertices[vertices.length-1][1]);
                ctx.lineTo(vertices[0][0], vertices[0][1]);

                ctx.closePath();
                ctx.fillStyle = "red";
                ctx.fill();
            }

            let neighbors : number[][] = get_neighbors(t.get_center());

            let i = 0;
            while (i < neighbors.length){
                let adj_tile : Tile = createTile(neighbors[i]);
                if (!visited.has(adj_tile.hash())){
                    q.enqueue(adj_tile);
                    visited.add(adj_tile.hash());
                }
                i += 1;
            }
        }
    }

    

}

/*
Returns a 2D array of the centers of the tiles neighbors

NW/\NE
 W||E
SW\/SE

The directions refer to the direction to the adjacent neighbor
*/
function get_neighbors(point: number[]): number[][] {
    let nw = [point[0] + Dir.NW.getX(), point[1] + Dir.NW.getY()];
    let ne = [point[0] + Dir.NE.getX(), point[1] + Dir.NE.getY()];
    let e = [point[0] + Dir.E.getX(), point[1] + Dir.E.getY()];
    let se = [point[0] + Dir.SE.getX(), point[1] + Dir.SE.getY()];
    let sw = [point[0] + Dir.SW.getX(), point[1] + Dir.SW.getY()];
    let w = [point[0] + Dir.W.getX(), point[1] + Dir.W.getY()];

    let ret = [nw, ne, e, se, sw, w];

    return ret;
}

//Returns a graph where the nodes are tiles
function createTiles() : Graph<string, Tile>{
    
    let start: Array<number> = [hex_width/2.0, hex_height/2.0];
    
    let start_tile: Tile = createTile(start);

    let g = new Graph<string, Tile>();

    var row : number = 0;

    var tile_array: Tile[][] = [];

    var index : number = 0;

    while (index < 11){
        tile_array[index] = [];
        index += 1;
    }

    while (row < 11){
        var col : number = 0;
        while (col < 11){
            let init_center = [start[0] + col*hex_width, start[1]];
            let init_tile = createTile(init_center);
            g.addVertex(init_tile)

            tile_array[row][col] = init_tile;

            if (col >= 1){
                //add an edge between left neighbor of this tile and curr tile
                g.addEdge(tile_array[row][col], tile_array[row][col-1]);
                g.addEdge(tile_array[row][col-1], tile_array[row][col]);
            }
            if (row >= 1){
                //add an edge between NW neighbor of this tile and curr tile
                g.addEdge(tile_array[row-1][col], tile_array[row][col]);
                g.addEdge(tile_array[row][col], tile_array[row-1][col]);

                if (col < 10){
                    //add an edge between NE neighbor of this tile and curr tile
                    g.addEdge(tile_array[row-1][col+1], tile_array[row][col]);
                    g.addEdge(tile_array[row][col], tile_array[row-1][col+1]);
                }
            }
            col += 1;
        }
        start[0] += hex_width/2.0;
        start[1] += hex_side + .5*hex_side;
        row += 1;
    }

    return g; 
    
}

/*creates a single tile and returns it; takes in an array of two points
  n
nw/\ne 
sw||se
  \/
  s
  The directions refer to the position of the vertices of the tile
*/
function createTile(center){
    const nw = [center[0]  - hex_width/2.0, center[1] + -hex_side/2.0];
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




