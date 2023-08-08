import { getJSDocReturnTag, isConstructorDeclaration, visitEachChild } from "typescript";
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

} 


export default Board




