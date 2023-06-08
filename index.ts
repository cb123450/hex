import {Queue, Tile, Graph} from "./util";

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

//Game Loop
function drawGame(){
    clearScreen();
    let g : Graph<Tile> = createTiles();
    drawTiles(g);
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
function createTiles(){
    
    let start: Array<number> = [canvas.width/2.0, canvas.height/2.0];

    let start_tile: Tile = createTile(start);

    const q = new Queue<Tile>();
    q.enqueue(start_tile);

    let graph = new Graph<Tile>();
    graph.addVertex(start_tile);

    let visited = new Set();

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

function drawTiles(points : Graph<Tile>){
    if (ctx != null){
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        let i = 0
        while (i < points.length-1){
            ctx.moveTo(points[i][0], points[i][1]);
            ctx.lineTo(points[i+1][0], points[i+1][1])
            ctx.stroke();
            i += 2;
        }
    }

}

drawGame();

