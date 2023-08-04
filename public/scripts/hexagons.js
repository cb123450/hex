"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
var side_length = window.innerWidth / 55;
var root3 = 1.73205;
var height = 2 * side_length;
var width = root3 * side_length;
var border_bottom_top = side_length - (side_length / 2.0);
var border_left_right = (root3 / 2.0) * side_length;
var grid = document.getElementById("grid");
var start_button = document.getElementById("start-button");
function drawBoard() {
    //Create tile array to aid in creaetion of graph
    let tile_array = [];
    var index = 0;
    while (index < 11) {
        tile_array[index] = [];
        index += 1;
    }
    if (grid != null) {
        grid.style.gridTemplateRows = "repeat(12, minmax(" + height + "px, " + height + "px))";
        grid.style.gridTemplateColumns = "repeat(25, minmax(" + width + "px, " + width + "px))";
    }
    /* Listen to parent of the tiles to improve efficiency */
    grid === null || grid === void 0 ? void 0 : grid.addEventListener("click", buttonHandler, false);
    start_button === null || start_button === void 0 ? void 0 : start_button.addEventListener("click", startHandler, false);
    var row = 1;
    while (row < 14) {
        var col = 1;
        while (col < 14) {
            //Create new html element
            var hex_container = document.createElement("div");
            hex_container.id = 'r_' + row + '_c_' + col;
            hex_container.className = "false";
            grid === null || grid === void 0 ? void 0 : grid.appendChild(hex_container);
            var sheet = window.document.styleSheets[0];
            var num = col + row;
            var right_offset = (width / 2.0) * (row - 1);
            var top_offset = -0.5 * (row - 1);
            var style = '#' + hex_container.id +
                ' {\n'
                + 'position: relative;'
                //+ 'width: ' + width + ';'
                //+ 'height: ' + height + ';'
                + 'right: ' + right_offset + 'px;'
                + 'top: ' + top_offset + 'vh;'
                //+ 'box-sizing: content-box;'
                //+ 'padding-right: 100%;'
                + 'grid-column: ' + num + ';\n'
                + 'grid-row: ' + row + ';\n}';
            sheet.insertRule(style, sheet.cssRules.length);
            if (row == 1 && col >= 3) {
                //TOP BORDER
                var upper_border = document.createElement("div");
                upper_border.id = hex_container.id + "_upper_border";
                hex_container.appendChild(upper_border);
                var style_upper_border = '#' + upper_border.id
                    + ' {\n'
                    + 'width: 0;'
                    + 'position: relative;'
                    + 'left: ' + -width / 2.0 + 'px;'
                    + 'z-index: -1;'
                    + 'top: ' + height / 1.25 + 'px;'
                    + 'border-bottom: ' + side_length / 2.0 + 'px solid red;'
                    + 'border-top: ' + side_length / 4.0 + 'px solid red;'
                    + 'border-left: ' + width / 2.0 + 'px solid red;'
                    + 'border-right: ' + width / 2.0 + 'px solid red;'
                    + '\n}';
                sheet.insertRule(style_upper_border, sheet.cssRules.length);
            }
            else if (row == 13 && col >= 2 && col <= 12) {
                //BOTTOM BORDER
                var lower_border = document.createElement("div");
                lower_border.id = hex_container.id + "_lower_border";
                hex_container.appendChild(lower_border);
                var style_lower_border = '#' + lower_border.id
                    + ' {\n'
                    + 'width: 0;'
                    + 'position: relative;'
                    + 'left: ' + -width / 1.7 + 'px;'
                    + 'z-index: -1;'
                    + 'top: ' + -height / 9.0 + 'px;'
                    + 'border-bottom: ' + side_length / 2.8 + 'px solid red;'
                    + 'border-top: ' + side_length / 4.0 + 'px solid red;'
                    + 'border-left: ' + width / 2.0 + 'px solid red;'
                    + 'border-right: ' + width / 2.0 + 'px solid red;'
                    + '\n}';
                sheet.insertRule(style_lower_border, sheet.cssRules.length);
            }
            else if (col == 1 && row >= 3) {
                //LEFT BORDER
                var left_border = document.createElement("div");
                left_border.id = hex_container.id + "_left_border";
                hex_container.appendChild(left_border);
                const rotation = 6.0 / 36.0;
                var style_left_border = '#' + left_border.id
                    + ' {\n'
                    + 'width: 0;'
                    + 'position: relative;'
                    + 'left: ' + width / 7.5 + 'px;'
                    + 'z-index: -1;'
                    + 'top: ' + -height / 3.4 + 'px;'
                    + 'border-bottom: ' + side_length / 2.8 + 'px solid blue;'
                    + 'border-top: ' + side_length / 4.0 + 'px solid blue;'
                    + 'border-left: ' + width / 2.0 + 'px solid blue;'
                    + 'border-right: ' + width / 2.0 + 'px solid blue;'
                    + 'transform: rotate(' + rotation + 'turn);'
                    + '\n}';
                sheet.insertRule(style_left_border, sheet.cssRules.length);
            }
            else if (col == 13 && row <= 12) {
                //RIGHT BORDER
                var right_border = document.createElement("div");
                right_border.id = hex_container.id + "_right_border";
                hex_container.appendChild(right_border);
                const rotation = 6.0 / 36.0;
                if (row == 1) {
                }
                var style_right_border = '#' + right_border.id
                    + ' {\n'
                    + 'width: 0;'
                    + 'position: relative;'
                    + 'left: ' + -width / 1.4 + 'px;'
                    + 'z-index: -1;'
                    + 'top: ' + height / 6.5 + 'px;'
                    + 'border-bottom: ' + side_length / 2.8 + 'px solid blue;'
                    + 'border-top: ' + side_length / 4.0 + 'px solid blue;'
                    + 'border-left: ' + width / 2.0 + 'px solid blue;'
                    + 'border-right: ' + width / 2.0 + 'px solid blue;'
                    + 'transform: rotate(' + rotation + 'turn);'
                    + '\n}';
                sheet.insertRule(style_right_border, sheet.cssRules.length);
            }
            else if (row > 1 && row < 13 && col > 1 && col < 13) {
                //UPPER
                var upper = document.createElement("div");
                upper.id = hex_container.id + "_upper";
                hex_container.appendChild(upper);
                var style_upper = '#' + upper.id +
                    ' {\n'
                    + 'width: 0;'
                    + 'border-bottom: ' + border_bottom_top + 'px solid #6C8;'
                    + 'border-left: ' + border_left_right + 'px solid transparent;'
                    + 'border-right: ' + border_left_right + 'px solid transparent;'
                    + '\n}';
                sheet.insertRule(style_upper, sheet.cssRules.length);
                //MIDDLE
                var middle = document.createElement("div");
                middle.id = hex_container.id + "_middle";
                hex_container.appendChild(middle);
                var style_middle = '#' + middle.id +
                    ' {\n'
                    + 'grid-column: ' + col + ';\n'
                    + 'grid-row: ' + row + ';\n'
                    + 'width: ' + width + 'px;\n'
                    + 'height: ' + side_length + 'px;\n'
                    + 'background: #6C8;'
                    + '\n}';
                sheet.insertRule(style_middle, sheet.cssRules.length);
                //LOWER
                var lower = document.createElement("div");
                lower.id = hex_container.id + "_lower";
                hex_container.appendChild(lower);
                var style_lower = '#' + lower.id +
                    ' {\n'
                    + 'width: 0;'
                    + 'border-top: ' + border_bottom_top + 'px solid #6C8;'
                    + 'border-left: ' + border_left_right + 'px solid transparent;'
                    + 'border-right: ' + border_left_right + 'px solid transparent;'
                    + '\n}';
                sheet.insertRule(style_lower, sheet.cssRules.length);
                //CREATE TILE ARRAY
                //The default color of the tile is a shade of green
                tile_array[row - 2][col - 2] = new util_1.Tile(row, col, "#6C8");
            }
            col += 1;
        }
        row += 1;
    }
    return tile_array;
}
/*Returns a graph where the nodes are tiles
links the edges and vertices together
*/
function createTiles(t) {
    var tile_array = t;
    let g = new util_1.Graph();
    var row = 0;
    while (row < 11) {
        var col = 0;
        while (col < 11) {
            g.addVertex(tile_array[row][col]);
            if (col >= 1) {
                //add an edge between left neighbor of this tile and curr tile
                g.addEdge(tile_array[row][col], tile_array[row][col - 1]);
                g.addEdge(tile_array[row][col - 1], tile_array[row][col]);
            }
            if (row >= 1) {
                //add an edge between NW neighbor of this tile and curr tile
                g.addEdge(tile_array[row - 1][col], tile_array[row][col]);
                g.addEdge(tile_array[row][col], tile_array[row - 1][col]);
                if (col < 10) {
                    //add an edge between NE neighbor of this tile and curr tile
                    g.addEdge(tile_array[row - 1][col + 1], tile_array[row][col]);
                    g.addEdge(tile_array[row][col], tile_array[row - 1][col + 1]);
                }
            }
            col += 1;
        }
        row += 1;
    }
    return g;
}
var turn = 0;
let tile_array = drawBoard();
let g = createTiles(tile_array);
function buttonHandler(evt) {
    let test_arr = (evt.target.id).split('_');
    let r = test_arr[0];
    let r_coord = parseInt(test_arr[1]);
    let c = test_arr[2];
    let c_coord = parseInt(test_arr[3]);
    //RECONSTRUCT hex_id
    if (r === 'r') {
        let hex_container_id = test_arr.slice(0, -1).join('_');
        let hex_container = document.querySelector("#" + hex_container_id);
        if ((hex_container === null || hex_container === void 0 ? void 0 : hex_container.className) == 'false' && r === 'r' && c === 'c' && r_coord >= 2 && r_coord <= 12 && c_coord >= 2 && c_coord <= 12) {
            let hex_upper = document.getElementById(hex_container_id + "_upper");
            let hex_middle = document.getElementById(hex_container_id + "_middle");
            let hex_lower = document.getElementById(hex_container_id + "_lower");
            //grid is not null by children are
            if (turn % 2 == 0) {
                //change to red
                //upper
                if (hex_upper != null) {
                    hex_upper.style.borderBottomColor = "red";
                }
                //middle
                if (hex_middle != null) {
                    hex_middle.style.background = "red";
                }
                //bottom
                if (hex_lower != null) {
                    hex_lower.style.borderTopColor = "red";
                }
                turn += 1;
                hex_container.className = "true";
                tile_array[r_coord - 2][c_coord - 2].set_color("red");
                let red_win = checkWin("red");
                //if red wins
                if (red_win) {
                    window.alert("Red has won!");
                    console.log("Red has won! Press the restart button to play again!");
                }
            }
            else {
                //change to blue
                //upper
                if (hex_upper != null) {
                    hex_upper.style.borderBottomColor = "blue";
                }
                //middle
                if (hex_middle != null) {
                    hex_middle.style.background = "blue";
                }
                //bottom
                if (hex_lower != null) {
                    hex_lower.style.borderTopColor = "blue";
                }
                turn += 1;
                hex_container.className = "true";
                tile_array[r_coord - 2][c_coord - 2].set_color("blue");
                let blue_win = checkWin("blue");
                //if blue wins
                if (blue_win) {
                    window.alert("Blue has won!");
                    console.log("Blue has won! Press the restart button to play again!");
                }
            }
            evt.stopPropagation();
        }
    }
}
function startHandler(evt) {
    turn = 0;
    let r = 2;
    while (r <= 12) {
        let c = 2;
        while (c <= 12) {
            let hex_container_id = 'r_' + r + '_c_' + c;
            let hex_container = document.querySelector("#" + hex_container_id);
            if ((hex_container === null || hex_container === void 0 ? void 0 : hex_container.className) == "true") {
                hex_container.className = "false";
                let hex_upper = document.getElementById(hex_container_id + "_upper");
                let hex_middle = document.getElementById(hex_container_id + "_middle");
                let hex_lower = document.getElementById(hex_container_id + "_lower");
                if (hex_upper != null) {
                    hex_upper.style.borderBottomColor = "#6C8";
                }
                //middle
                if (hex_middle != null) {
                    hex_middle.style.background = "#6C8";
                }
                //bottom
                if (hex_lower != null) {
                    hex_lower.style.borderTopColor = "#6C8";
                }
            }
            c += 1;
        }
        r += 1;
    }
    let i = 0;
    while (i < 11) {
        let k = 0;
        while (k < 11) {
            tile_array[i][k].set_color("#6C8");
            k += 1;
        }
        i += 1;
    }
}
/*
ENUM for red player and blue player
*/
var Player;
(function (Player) {
    Player[Player["Red"] = 0] = "Red";
    Player[Player["Blue"] = 1] = "Blue";
})(Player || (Player = {}));
function bfs(t, color) {
    let visited = new Set();
    let q = new util_1.Queue();
    q.enqueue(t);
    visited.add(t.hash());
    let adj = g.getAdjacencyList();
    while (q.size() != 0) {
        let samp = q.dequeue();
        if (samp != undefined) {
            //console.log(samp)
            let h = samp.hash();
            let row = parseInt(h.split('_')[0]) - 2;
            let col = parseInt(h.split('_')[1]) - 2;
            //always start bfs for red player from row 0 and start bfs for blue player from col 0
            if (color == "red" && row == 10) {
                return true;
            }
            else if (color == "blue" && col == 10) {
                return true;
            }
            let neighbors = adj[samp.hash()];
            neighbors.forEach((value, key) => {
                let r = parseInt(value.hash().split('_')[0]) - 2;
                let c = parseInt(value.hash().split('_')[1]) - 2;
                if (tile_array[r][c].get_color() == color && !visited.has(value.hash())) {
                    q.enqueue(value);
                    visited.add(value.hash());
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
function checkWin(color) {
    let i = 0;
    while (i < 11) {
        if (color == "red") {
            let check_red = bfs(tile_array[0][i], "red");
            //console.log("red")
            if (check_red) {
                return true;
            }
        }
        else if (color == "blue") {
            let check_blue = bfs(tile_array[i][0], "blue");
            //console.log("blue")
            if (check_blue) {
                return true;
            }
        }
        i += 1;
    }
    return false;
}
