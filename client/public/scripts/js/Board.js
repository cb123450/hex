import {  Queue  } from "./utility.js";
import {  drawBoard, createTiles  } from "./setup.js";
export class Board {
    constructor(socket) {
        this.socket = socket;
        this.tile_array = drawBoard();
        this.g = createTiles(this.tile_array);
    }
    bfs(t, color) {
        let visited = new Set();
        let q = new Queue();
        q.enqueue(t);
        visited.add(t.id);
        let adj = this.g.getAdjacencyList();
        while (q.size() != 0) {
            let samp = q.dequeue();
            if (samp != undefined) {
                let h = samp.id;
                let row = parseInt(h.split('_')[0]) - 2;
                let col = parseInt(h.split('_')[1]) - 2;
                //always start bfs for red player from row 0 and start bfs for blue player from col 0
                if (color == "red" && row == 10) {
                    return true;
                }
                else if (color == "blue" && col == 10) {
                    return true;
                }
                let neighbors = adj.get(samp.id);
                neighbors === null || neighbors === void 0 ? void 0 : neighbors.forEach((value, key) => {
                    let r = parseInt(value.id.split('_')[0]) - 2;
                    let c = parseInt(value.id.split('_')[1]) - 2;
                    if (this.tile_array[r][c].get_color() == color && !visited.has(value.id)) {
                        q.enqueue(value);
                        visited.add(value.id);
                    }
                });
            }
        }
        return false;
    }
    /*
    * Checks if a player of a given color 'color' has won
    * Returns true if for a win and false otherwise
    */
    checkWin(color) {
        let i = 0;
        while (i < 11) {
            if (color === "red" && this.tile_array[0][i].get_color() === "red") {
                let check_red = this.bfs(this.tile_array[0][i], "red");
                if (check_red) {
                    return true;
                }
            }
            else if (color == "blue" && this.tile_array[i][0].get_color() === "blue") {
                let check_blue = this.bfs(this.tile_array[i][0], "blue");
                if (check_blue) {
                    return true;
                }
            }
            i += 1;
        }
        return false;
    }
    changeColor(row, col, color) {
        if (row >= 2 && row <= 12 && col >= 2 && col <= 12) {
            let hex_container_id = 'r_' + row + '_c_' + col;
            let hex_container = document.querySelector("#" + hex_container_id);
            if (hex_container != null && hex_container.className == 'free') {
                let arr = hex_container_id.split('_');
                let row = parseInt(arr[1]);
                let col = parseInt(arr[3]);
                hex_container.className = "taken";
                let hex_upper = document.getElementById(hex_container_id + "_upper");
                let hex_middle = document.getElementById(hex_container_id + "_middle");
                let hex_lower = document.getElementById(hex_container_id + "_lower");
                if (hex_upper != null) {
                    //console.log(hex_upper.style.borderBottomColor)
                    hex_upper.style.borderBottomColor = color;
                    //console.log(hex_upper.style.borderBottomColor)
                }
                //middle
                if (hex_middle != null) {
                    hex_middle.style.background = color;
                }
                //bottom
                if (hex_lower != null) {
                    hex_lower.style.borderTopColor = color;
                }
                this.tile_array[row - 2][col - 2].set_color(color);
            }
        }
    }
}
export default Board;
