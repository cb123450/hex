import { drawBoard, createTiles } from "./gameBoard.js";
var turn = 0;
let tile_array = drawBoard();
let g = createTiles(tile_array);
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
