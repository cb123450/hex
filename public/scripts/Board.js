import { drawBoard, createTiles } from "./setup.js";
export class Board {
    constructor(socket) {
        this.socket = socket;
        this.tile_array = drawBoard();
        this.g = createTiles(this.tile_array);
    }
    get getSocket() {
        return this.socket;
    }
    get getTileArray() {
        return this.tile_array;
    }
    get getTileGraph() {
        return this.g;
    }
}
export default Board;
