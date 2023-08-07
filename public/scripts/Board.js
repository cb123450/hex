import { drawBoard, createTiles } from "./setup.js";
export class Board {
    constructor(socket) {
        this.socket = socket;
        this.tile_array = drawBoard();
        this.g = createTiles(this.tile_array);
    }
}
export default Board;
