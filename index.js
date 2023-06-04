const canvas = document.getElementById('gameArea');

const width = window.innerWidth;
const height = window.innerHeight;

const hex_side = width/40;
const hex_height = Math.sqrt(3);
const hex_width = 2.0;

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext('2d');

//Game Loop
function drawGame(){
    clearScreen();
    var points = createBoard()
    drawBoard(points);
}

//Randomly create the board
function createBoard(){
    var y_i = 0.0;
    while (y_i < height){
        var x_i = 0.5*hex_side;
        while (x_i < width){
            ret.push([x_i, y_i]);
            ret.push([x_i + hex_side, y_i])
            x_i += hex_width*hex_side;
        }
        y_i += hex_height*hex_side;
    }

    /*
    x_i = 2*hex_side;
    while (x_i < width){
        ret.push([x_i, x_i + hex_side]);
        x_i += 2*hex_side;
    }
    */

    return ret; 
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
    ctx.fillRect(0,0, width, height);
}

drawGame();
