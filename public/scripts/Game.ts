import { visitEachChild } from "typescript";
import { deflateSync } from "zlib";
import {Tile, Graph, Queue} from "./utility.js";
import {drawBoard, createTiles} from "./gameBoard.js"
import { Socket } from "socket.io-client";
import {changeColor, checkWin} from "./helper.js"

export class Game{
    turn: number;
    tile_array : Tile[][];
    g : Graph<string, Tile>;
    socket : Socket;

    constructor(socket : Socket){
        this.turn = 0;
        this.tile_array = drawBoard();
        this.g = createTiles(this.tile_array);
        this.socket = socket;
    }

    get getSocket() : Socket{
        return this.socket;
    }

    get getTileArray() : Tile[][]{
        return this.tile_array;
    }

    get getTileGraph() : Graph<string, Tile>{
        return this.g;
    }

    get getTurn() : number {
        return this.turn;
    }

    set incrementTurn(val: number) {
        this.turn += 1 
    }
} 

export default Game




