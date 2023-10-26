import { changeColor } from "./interactive.js";
import { drawBoard, createTiles } from "./gameBoard.js";
import { io } from "socket.io-client";
const domain = process.env.MODE ? 'http://localhost:3000':'http://44.217.57.246';
const socket = io(domain);

var turn = 0;
let tile_array = drawBoard();
let g = createTiles(tile_array);

export function getSocket() {
    return socket;
}
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
