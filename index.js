const canvas = document.getElementById('gameArea');

const width = window.innerWidth;
const height = window.innerHeight;

const hex_side = width/40.0;
const hex_height = Math.sqrt(3);
const hex_c_to_c = 2.0;

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext('2d');

class Tile{
    constructor(center, vertices){
        this.center = center;
        this.vertices = vertices;
    }
}

class Graph{
    constructor(node, edges){
        this.node = node; //this tile
        this.edges = edges; //edges are other tiles [nw, n, ne, se, s, sw]
    }
}

//Game Loop
function drawGame(){
    clearScreen();
    var points = createTiles()
    drawBoard(points);
}

//Randomly create the board
function createTiles(){

    ret = [];
    var center = [hex_side, hex_height/2.0];

    var w = [center[0] - hex_side, center[1]];
    var nw = [center[0] - (hex_side/2.0), center[1] + hex_height/2.0];
    var ne = [nw[0] + hex_side, nw[1]];
    var e = [w[0] + hex_c_to_c, w[1]];
    var se = [ne[0], ne[1] - hex_height];
    var sw = [nw[0], nw[1] - hex_height];

    //array of arrays of floats
    var vertices = [w, nw, ne, e, se, sw];

    const t = new Tile([center_x, center_y], vertices);

    ret.append(t)

    return ret; 
}
function createTile(center){
    
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
