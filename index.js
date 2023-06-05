const canvas = document.getElementById('gameArea');
const ctx = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

//HEXAGON CONSTANTS
const hex_side = canvas.width/40.0;
const hex_height = Math.sqrt(3);
const hex_width = 2.0;

//Queue Class for creating board
class Queue {
    constructor() {
        this.items = {};
        this.first_item = 0;
        this.next_item = 0;
        this.size = 0;
    }
    enqueue(item) {
        this.items[this.next_item] = item;
        this.next_item++;
        this.size += 1.
    }
    dequeue() {
        if (first_item < this.next_item){
            const item = this.items[this.first_item];
            delete this.items[this.first_item];
            this.first_item++;
            this.size -= 1;
            return item;
        }
    }
    size(){
        return this.size;
    }
    peek() {
        return this.items[this.first_item];
    }
    get printQueue() {
        return this.items;
    }
}

//ENUM FOR NEIGHBORS OF A GIVEN TILE
const Neighbor = {
    N: 0,
    NE: 1, 
    SE: 2, 
    S: 3, 
    SW: 4, 
    NW: 5
}

//ENUM FOR VERTICES OF A GIVEN TILE
const Vertex = {
    W: 0,
    NW: 1, 
    NE: 2, 
    E: 3, 
    SE: 4, 
    SW: 5
}

/*center is [x, y] where x is the x-coord of the center 
of this tile and y is the y-coord of the center
vertices is an array of the vertices making up the hexagon
of this tile*/
class Tile{
    constructor(center, vertices, neighbors){
        this.center = center;
        this.vertices = vertices;
        this.neighbors = neighbors;
    }
    get_center(){
        return this.center;
    }
    get_vertices(){
        return this.vertices;
    }
}

/*node is a tile;
neighbors is an object that is a hashmap 
where the keys are the direction (n, ne, se, s, sw, nw) 
to get to the tile the and the values are tiles; will not
get collisions between the strings used as keys
because none of the strings are the same*/
class Graph{
    constructor(node, neighbors){
        this.node = node; 
        this.neighbors = neighbors; 
    }
}

//Game Loop
function drawGame(){
    clearScreen();
    let points = createTiles()
    drawBoard(points);
}

//to keep track of which tiles have been used already
var tile_set = Set();

function get_neighbors(point){
    let n = [point[0], point[1] - hex_height];
    let ne = [point[0] + (3.0/2.0)*(hex_side), point[1] - (hex_height/2.0)];
    let se = [ne[0], ne[1] + hex_height];
    let s = [n[0], point[1] + hex_height];
    let sw = [point[0] - (3.0/2.0)*(hex_side), se[1]];
    let nw = [sw[0], ne[1]];

    return [n, ne, se, s, sw, nw];
}
//Returns a graph where the nodes are tiles
function createTiles(){

    let neighbors = {};
    
    let start = [canvas.width/2.0, canvas.height/2.0];
    let start_tile = createTile(start);

    var s = start[0] + (start[1] + '');
    tile_set.add(s);
    const q = new Queue();
    q.enqueue(start_tile);

    let graph = new Graph(start_tile, {});

    while (q.size() != 0){
        t = q.dequeue();
        let neighbors = get_neighbors(t.get_center());
        graph.neighbors = neighbors;

        let i = 0;
        while (i < neighbors.length){

            i += 1;
        }

    }




    return ret; 
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
    const vertices = [w, nw, ne, e, se, sw];
    const t = new Tile(center, vertices);
    
    return t; 

}

function drawBoard(points){
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    i = 0
    while (i < points.length-1){
        ctx.moveTo(points[i][0], points[i][1]);
        ctx.lineTo(points[i+1][0], points[i+1][1])
        ctx.stroke();
        i += 2;
    }

}

function clearScreen(){
    ctx.fillStyle = "brown";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

drawGame();
