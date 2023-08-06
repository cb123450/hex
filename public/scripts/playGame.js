import { changeColor } from "./interactive.js";
import { drawBoard, createTiles } from "./gameBoard.js";
import { io } from "../../node_modules/socket.io-client";
var turn = 0;
let tile_array = drawBoard();
let g = createTiles(tile_array);
const socket = io('http://localhost:3001');
export function getTileArray() {
    return tile_array;
}
export function getTileGraph() {
    return g;
}
export function getTurn() {
    return turn;
}
export function incrementTurn() {
    turn += 1;
}
socket.on("colorChange", (e) => {
    let row = e.r_coord;
    let col = e.c_coord;
    let newColor = e.color;
    changeColor(row, col, newColor);
});
