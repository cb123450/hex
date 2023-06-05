const canvas = document.getElementById('gameArea');
const ctx = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

//HEXAGON CONSTANTS
const hex_side = canvas.width/40.0;
const hex_height = Math.sqrt(3);
const hex_c_to_c = 2.0;

//to keep track of which tiles have been used already
var tile_set = Set();

/*center is [x, y] where x is the x-coord of the center 
of this tile and y is the y-coord of the center
vertices is an array of the vertices making up the hexagon
of this tile*/
class Tile{
    constructor(center, vertices){
        this.center = center;
        this.vertices = vertices;
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
    var points = createTiles()
    drawBoard(points);
}

//Returns a graph where the nodes are tiles
function createTiles(){

    var neighbors = {};

    var graph = new Graph(null, neigbors);
    
    /* TWO ROWS IDEA
    var top_center = [hex_side, hex_height/2.0];
    var bot_center = [center_0[0]+hex_side+(hex_side/2), center_0[1]*2.0];

    var top_row_0 = createTile(top_center);
    var bot_row_0 = createTile(bot_center);

    var x_i_top = top_center[0];

    var x_i_bot = bot_center[0];
    */

    


    return ret; 
}

//creates a single tile and returns it; takes in an array of two points
function createTile(center){
    var w = [center[0] - hex_side, center[1]];
    var nw = [center[0] - (hex_side/2.0), center[1] + hex_height/2.0];
    var ne = [nw[0] + hex_side, nw[1]];
    var e = [w[0] + hex_c_to_c, w[1]];
    var se = [ne[0], ne[1] - hex_height];
    var sw = [nw[0], nw[1] - hex_height];

    //array of arrays of floats
    var vertices = [w, nw, ne, e, se, sw];
    var t = new Tile(center, vertices);
    
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
