import { visitEachChild } from "typescript";
import { deflateSync } from "zlib";
import {Tile, Graph, Queue} from "./utility.js";
import {buttonHandler, startHandler} from "./interactive.js"
import {drawBoard, createTiles} from "./gameBoard.js"

var turn: number = 0;
let tile_array : Tile[][] = drawBoard();
let g : Graph<string, Tile> = createTiles(tile_array); 

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



