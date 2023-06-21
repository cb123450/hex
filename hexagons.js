var side_length = window.innerWidth / 40;
var root3 = 1.73205;
var height = 2 * side_length;
var width = root3 * side_length;
var border_bottom_top = side_length - (side_length / 2.0);
var border_left_right = (root3 / 2.0) * side_length;
var grid_container = document.getElementById("grid-container");
var Tile = /** @class */ (function () {
    function Tile(row, col) {
        this.row = row;
        this.col = col;
    }
    Tile.prototype.get_row = function () {
        return this.row;
    };
    Tile.prototype.get_col = function () {
        return this.col;
    };
    Tile.prototype.hash = function () {
        var center_str = this.row + '_' + this.col;
        return center_str;
    };
    Tile.prototype.get_visited_flag = function () {
        return this.visited;
    };
    Tile.prototype.visit = function () {
        this.visited = true;
    };
    Tile.prototype.unvisit = function () {
        this.visited = false;
    };
    return Tile;
}());
var Graph = /** @class */ (function () {
    function Graph() {
        this.vertices = new Map;
        this.adj_list = new Map();
    }
    /*
    ---curr_tile is the current Tile object
    ---adj_tile is the adjacent Tile object
    */
    Graph.prototype.addEdge = function (curr_tile, adj_tile) {
        var curr_str = curr_tile.hash();
        var adj_str = adj_tile.hash();
        if (this.vertices.has(curr_str)) {
            this.adj_list[curr_str][adj_str] = adj_tile;
        }
        else {
            this.vertices.set(curr_str, curr_tile);
            this.adj_list[curr_str] = new Map;
            this.adj_list[curr_str][adj_str] = adj_tile;
        }
    };
    Graph.prototype.addVertex = function (curr_tile) {
        if (!this.vertices.has(curr_tile.hash())) {
            this.vertices.set(curr_tile.hash(), curr_tile);
            this.adj_list[curr_tile.hash()] = new Map;
        }
    };
    Graph.prototype.getVertices = function () {
        return this.vertices;
    };
    Graph.prototype.getAdjacencyList = function () {
        return this.adj_list;
    };
    Graph.prototype.unvisitAll = function () {
        var iter = this.vertices.values();
        while (iter.hasNext()) {
            var t = iter.next();
            t.unvisit();
        }
    };
    return Graph;
}());
var Queue = /** @class */ (function () {
    function Queue() {
        this.items = new Array;
        this.first_item = 0;
        this.next_item = 0;
        this.num_elements = 0;
    }
    Queue.prototype.enqueue = function (item) {
        this.items[this.next_item] = item;
        this.next_item++;
        this.num_elements += 1.;
    };
    Queue.prototype.dequeue = function () {
        if (this.first_item < this.next_item) {
            var item = this.items[this.first_item];
            this.first_item++;
            this.num_elements -= 1;
            return item;
        }
    };
    Queue.prototype.size = function () {
        return this.num_elements;
    };
    Queue.prototype.peek = function () {
        return this.items[this.first_item];
    };
    Object.defineProperty(Queue.prototype, "printQueue", {
        get: function () {
            return this.items;
        },
        enumerable: false,
        configurable: true
    });
    return Queue;
}());
//END----------Tile, Graph, and Queue DATA STRUCTURES---------
function drawBoard() {
    //Create tile array to aid in creaetion of graph
    var tile_array = [];
    var index = 0;
    while (index < 11) {
        tile_array[index] = [];
        index += 1;
    }
    if (grid_container != null) {
        grid_container.style.gridTemplateRows = "repeat(21, minmax(" + height + "px, " + height + "px))";
        grid_container.style.gridTemplateColumns = "repeat(25, minmax(" + width + "px, " + width + "px))";
    }
    var row = 1;
    while (row < 14) {
        var col = 1;
        while (col < 14) {
            //Create new html element
            var hex_container = document.createElement("div");
            hex_container.id = 'r' + row + 'c' + col;
            grid_container === null || grid_container === void 0 ? void 0 : grid_container.appendChild(hex_container);
            var sheet = window.document.styleSheets[0];
            var num = col + row;
            var right_offset = (width / 2.0) * (row - 1);
            var top_offset = -6 * (row - 1);
            var style = '#' + hex_container.id +
                ' {\n'
                + 'position: relative;'
                //+ 'width: ' + width + ';'
                //+ 'height: ' + height + ';'
                + 'right: ' + right_offset + 'px;'
                + 'top: ' + top_offset + 'px;'
                //+ 'box-sizing: content-box;'
                //+ 'padding-right: 100%;'
                + 'grid-column: ' + num + ';\n'
                + 'grid-row: ' + row + ';\n}';
            sheet.insertRule(style, sheet.cssRules.length);
            if (row == 1 && col >= 3) {
                //TOP BORDER
                var upper_border = document.createElement("div");
                upper_border.id = 'r' + row + 'c' + col + "_upper_border";
                hex_container.appendChild(upper_border);
                console.log(upper_border.id);
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
                lower_border.id = 'r' + row + 'c' + col + "_lower_border";
                hex_container.appendChild(lower_border);
                console.log(lower_border.id);
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
                left_border.id = 'r' + row + 'c' + col + "_left_border";
                hex_container.appendChild(left_border);
                console.log(left_border.id);
                var rotation = 6.0 / 36.0;
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
                right_border.id = 'r' + row + 'c' + col + "_right_border";
                hex_container.appendChild(right_border);
                console.log(right_border.id);
                var rotation = 6.0 / 36.0;
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
                upper.id = 'r' + row + 'c' + col + "_upper";
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
                middle.id = 'r' + row + 'c' + col + "_middle";
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
                //ADD BUTTON TO MIDDLE
                var b = document.createElement("button");
                middle.appendChild(b);
                b.addEventListener("click", function () { return buttonPressed(row, col); });
                b.id = middle.id + '_button';
                var button_style = '#' + b.id +
                    ' {\n'
                    + 'height: ' + side_length + 'px;\n'
                    + 'width: ' + width + 'px;\n'
                    + 'background-color: rgb(102, 204, 136);\n'
                    + 'border: 0px;\n'
                    + ''
                    + '\n}';
                sheet.insertRule(button_style, sheet.cssRules.length);
                //LOWER
                var lower = document.createElement("div");
                lower.id = 'r' + row + 'c' + col + "_lower";
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
                tile_array[row - 2][col - 2] = new Tile(row, col);
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
    var g = new Graph();
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
function buttonPressed(row, col) {
    var element_id = 'r' + row + 'c' + col;
    var hex_upper = document.getElementById(element_id + "_upper");
    var hex_middle = document.getElementById(element_id + "_middle");
    var hex_lower = document.getElementById(element_id + "_lower");
    if (getTurn() % 2 == 0) {
        //change to red
        //upper
        if (hex_upper == null) {
            console.log("Test");
        }
        if (hex_upper != null) {
            hex_upper.style.borderBottom = border_bottom_top + 'px solid red;';
        }
        //middle
        if (hex_middle != null) {
            hex_middle.style.background = "red";
        }
        //bottom
        if (hex_lower != null) {
            hex_lower.style.borderTop = border_bottom_top + 'px solid red;';
        }
    }
    else {
        //change to blue
        //upper
        if (hex_upper != null) {
            hex_upper.style.borderBottom = border_bottom_top + 'px solid blue;';
        }
        //middle
        if (hex_middle != null) {
            hex_middle.style.background = "blue";
        }
        //bottom
        if (hex_lower != null) {
            hex_lower.style.borderTop = border_bottom_top + 'px solid blue;';
        }
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
/*
* Checks if a player has won
* Returns true if 'player' has won and false if not
*/
function checkWin(player) {
    return false;
}
/* turn variable and accessor and incrementer*/
var turn = 0;
function getTurn() {
    return turn;
}
function incrementTurn() {
    turn += 1;
}
/*
* Run the game
* Red goes first and moves on even turn numbers 0, 2, 4, ...
*/
function playGame() {
    turn = 0;
    var curr_player = Player.Red;
    while (!checkWin(curr_player)) {
        //CONNECT BUTTONS AND ACCESS CSS STYLE SHEETS TO CHANGE COLORS AND CHECK THAT BUTTON HASN'T ALREADY BEEN PRESSED
        incrementTurn();
    }
    return getTurn();
}
var tile_array = drawBoard();
var g = createTiles(tile_array);
/*
let winner = playGame();
if (winner % 2 == 1){
    //RED PLAYER HAS WON
}
else{
    //BLUE PLAYER HAS WON
}
*/
