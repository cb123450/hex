const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('gameArea');
const ctx = canvas.getContext('2d');

const width: number = window.innerWidth;
const height: number = window.innerHeight;

canvas.width = width;
canvas.height = height;

//HEXAGON CONSTANTS
const hex_side: number = canvas.width/40.0;
const hex_height: number = Math.sqrt(3)*hex_side; //from edge to opposite edge
const hex_width: number = 2.0*hex_side; //from corner to opposite corner

/*
ORIENTATION OF HEXAGON ON BOARD ->
 __
/  \
\__/
*/

/*ENUM FOR NEIGHBORS OF A GIVEN TILE
 _N_
/   \
\___/
  S
*/
const Neighbor = {
    N: 0,
    NE: 1, 
    SE: 2, 
    S: 3, 
    SW: 4, 
    NW: 5
}

/*ENUM FOR VERTICES OF A GIVEN TILE
NW__
 /  \
 \__/
    SE
*/
const Vertex = {
    NW: 0, 
    NE: 1, 
    E: 2, 
    SE: 3, 
    SW: 4, 
    W: 5
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
    vertices_set;
    adj_list;
}

class Graph<Hashable, T>{
    constructor(){
        this.vertices_set = new Set<Hashable>; 
        this.adj_list = new Map<Hashable, Map<Hashable, T>>();
    }

    /*
    ---curr_tile is the current Tile object
    ---adj_tile is the adjacent Tile object
    */
    addEdge(curr_tile, adj_tile){
        let curr_str = curr_tile.hash();
        let adj_str = adj_tile.hash();

        if (this.vertices_set.has(curr_str)){
            this.adj_list[curr_str][adj_str] = adj_tile;
        }
        else{
            this.vertices_set.add(curr_str)
            this.adj_list[curr_str] = new Map<Hashable, T>;
            this.adj_list[curr_str][adj_str] = adj_tile;
        }
    }

    addVertex(curr_tile){
        if (!this.vertices_set.has(curr_tile.hash())){
            this.vertices_set.add(curr_tile.hash());
            this.adj_list[curr_tile.hash()] = new Map<Hashable, T>;
        }
    }
    
    getVerticesSet() : Set<Hashable>{
        return this.vertices_set;
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
    //drawTiles(g);
}

function clearScreen(){
    if (ctx != null){
        ctx.fillStyle = "brown";
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }
}

function get_neighbors(point: Array<number>): Array<Array<number>>{
    let n = [point[0], point[1] - hex_height];
    let ne = [point[0] + (3.0/2.0)*(hex_side), point[1] - (hex_height/2.0)];
    let se = [ne[0], ne[1] + hex_height];
    let s = [n[0], point[1] + hex_height];
    let sw = [point[0] - (3.0/2.0)*(hex_side), se[1]];
    let nw = [sw[0], ne[1]];

    return [n, ne, se, s, sw, nw];
}

//Returns a graph where the nodes are tiles
function createTiles() : Graph<string, Tile>{
    
    let start: Array<number> = [canvas.width/2.0, canvas.height/2.0];

    
    let start_tile: Tile = createTile(start);

    const q = new Queue<Tile>();
    q.enqueue(start_tile);

    let graph = new Graph<string, Tile>();

    
    let visited = new Set<string>();

    while (q.size() != 0){
        let curr_tile : Tile | undefined = q.dequeue();

        
        if(curr_tile != undefined && !visited.has(curr_tile.hash())){
            visited.add(curr_tile.hash())
            graph.addVertex(curr_tile)

            let neighbors : Array<Array<number>> = get_neighbors(curr_tile.get_center());
            
            for (let n_center of neighbors){
                let adj_tile : Tile = createTile(n_center);

                if (!visited.has(adj_tile.hash())){
                    q.enqueue(adj_tile);
                }
                
                graph.addEdge(curr_tile, adj_tile);
            }
        }

    }
    
    return graph; 
    
}

//creates a single tile and returns it; takes in an array of two points
function createTile(center){
    const w = [center[0] - hex_side, center[1]];
    const nw = [center[0] - (hex_side/2.0), center[1] - hex_height/2.0];
    const ne = [nw[0] + hex_side, nw[1]];
    const e = [w[0] + hex_width, w[1]];
    const se = [ne[0], ne[1] + hex_height];
    const sw = [nw[0], nw[1] + hex_height];

    //array of arrays of doubles
    const vertices: Array<Array<number>> = [w, nw, ne, e, se, sw];
    const t = new Tile(center, vertices);
    return t; 
}

/*
function drawTiles(points : Graph<string, Tile>){
    if (ctx != null){
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const tiles : Set<string>= points.getAdjacencyList();
        let k = 0;
        while (k < tiles.size){
            let t : Tile= tiles[k]
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
            k += 1;
        }
    }
}
*/

drawGame();

