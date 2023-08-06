import { visitEachChild } from "typescript";
import { deflateSync } from "zlib";
import {Tile, Graph, Queue} from "./utility.js";
import {buttonHandler, startHandler, changeColor} from "./interactive.js"
import {drawBoard, createTiles} from "./gameBoard.js"
import { io } from "../../node_modules/socket.io-client";

var turn: number = 0;
let tile_array : Tile[][] = drawBoard();
let g : Graph<string, Tile> = createTiles(tile_array); 
const socket = io('http://localhost:3001');

export function getTileArray() : Tile[][]{
    return tile_array;

}

export function getTileGraph() : Graph<string, Tile>{
    return g;
}

export function getTurn() : number{
    return turn;
}

export function incrementTurn() : void{
    turn += 1;
}

socket.on("colorChange", (e) => {
    let row = e.r_coord;
    let col = e.c_coord;
    let newColor = e.color;

    changeColor(row, col, newColor)
})



