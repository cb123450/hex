import { getJSDocReturnTag, visitEachChild } from "typescript";
import { deflateSync } from "zlib";
import {Tile, Graph, Queue} from "./utility.js";
import {drawBoard, createTiles} from "./setup.js"
import { Socket } from "socket.io-client";

export class Board{
    tile_array : Tile[][];
    g : Graph<string, Tile>;
    socket : Socket;

    constructor(socket : Socket){
        this.socket = socket;
        this.tile_array = drawBoard();
        this.g = createTiles(this.tile_array);
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
} 


export default Board




