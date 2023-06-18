"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var width = window.innerWidth;
var height = window.innerHeight;
//set dimensions of parent container of canvas and buttons
var container = document.getElementById("container");
if (container != null) {
    container.style.width = width + '';
    container.style.height = height + '';
}
var canvas = document.getElementById('gameArea');
var ctx = canvas.getContext('2d');
canvas.width = width;
canvas.height = height;
canvas.style.top = "10%";
canvas.style.bottom = "100%";
canvas.style.left = "0%";
canvas.style.right = "90%";
//HEXAGON CONSTANTS
var hex_side = canvas.width / 30.0; //11 by 11 board but divide by 14.0 for extra space
var hex_height = 2.0 * hex_side; //from edge to opposite edge
var hex_width = Math.sqrt(3) * hex_side; //from corner to opposite corner
var Dir = /** @class */ (function () {
    function Dir(x, y) {
        this.x = x;
        this.y = y;
    }
    Dir.prototype.getX = function () {
        return this.x;
    };
    Dir.prototype.getY = function () {
        return this.y;
    };
    Dir.NW = new Dir(-hex_width / 2.0, -(hex_side / 2.0) - hex_side);
    Dir.NE = new Dir(-hex_width / 2.0, -(hex_side / 2.0) - hex_side);
    Dir.E = new Dir(hex_width, 0.0);
    Dir.SE = new Dir(hex_width / 2.0, hex_side / 2.0 + hex_side);
    Dir.SW = new Dir(-hex_width / 2.0, hex_side / 2.0 + hex_side);
    Dir.W = new Dir(-hex_width, 0.0);
    return Dir;
}());
var Tile = /** @class */ (function () {
    function Tile(center, vertices) {
        this.center = center;
        this.vertices = vertices;
        this.color = "blue";
        this.visited = false;
    }
    Tile.prototype.get_center = function () {
        return this.center;
    };
    Tile.prototype.get_vertices = function () {
        return this.vertices;
    };
    Tile.prototype.hash = function () {
        var center_str = this.center[0] + '_' + this.center[1];
        return center_str;
    };
    Tile.prototype.set_color = function (color) {
        this.color = color;
    };
    Tile.prototype.get_color = function () {
        return this.color;
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
/**************************************** */
//Game Loop
function drawGame() {
    clearScreen();
    var g = createTiles();
    drawTiles(g);
    //changeColor(g);
}
function clearScreen() {
    if (ctx != null) {
        ctx.fillStyle = "green";
        var w = 17 * hex_width;
        var h = 6 * hex_side + 6 * hex_height;
        ctx.fillRect(0, 0, w, h);
    }
}
/* Test to see if I can change the tiles colors
*/
function changeColor(g) {
    var q = new Queue();
    var visited = new Set();
    var adj_list = g.getVertices();
    var iterator = adj_list.values();
    var start_tile = iterator.next().value;
    q.enqueue(start_tile);
    visited.add(start_tile);
    //Run a BFS from 'start_tile'
    while (q.size() != 0) {
        var t = q.dequeue();
        console.log("test");
        if (t != undefined) {
            //color the vertex
            var vertices = t.get_vertices();
            if (ctx != null) {
                ctx.beginPath();
                var k = 0;
                while (k < vertices.length - 1) {
                    ctx.moveTo(vertices[k][0], vertices[k][1]);
                    ctx.lineTo(vertices[k + 1][0], vertices[k + 1][1]);
                    k += 1;
                }
                ctx.moveTo(vertices[vertices.length - 1][0], vertices[vertices.length - 1][1]);
                ctx.lineTo(vertices[0][0], vertices[0][1]);
                ctx.closePath();
                ctx.fillStyle = "red";
                ctx.fill();
            }
            var neighbors = get_neighbors(t.get_center());
            var i = 0;
            while (i < neighbors.length) {
                var adj_tile = createTile(neighbors[i]);
                if (!visited.has(adj_tile.hash())) {
                    q.enqueue(adj_tile);
                    visited.add(adj_tile.hash());
                }
                i += 1;
            }
        }
    }
}
/*
Returns a 2D array of the centers of the tiles neighbors

NW/\NE
 W||E
SW\/SE

The directions refer to the direction to the adjacent neighbor
*/
function get_neighbors(point) {
    var nw = [point[0] + Dir.NW.getX(), point[1] + Dir.NW.getY()];
    var ne = [point[0] + Dir.NE.getX(), point[1] + Dir.NE.getY()];
    var e = [point[0] + Dir.E.getX(), point[1] + Dir.E.getY()];
    var se = [point[0] + Dir.SE.getX(), point[1] + Dir.SE.getY()];
    var sw = [point[0] + Dir.SW.getX(), point[1] + Dir.SW.getY()];
    var w = [point[0] + Dir.W.getX(), point[1] + Dir.W.getY()];
    var ret = [nw, ne, e, se, sw, w];
    return ret;
}
//Returns a graph where the nodes are tiles
function createTiles() {
    var start = [hex_width / 2.0, hex_height / 2.0];
    var start_tile = createTile(start);
    var g = new Graph();
    var row = 0;
    var tile_array = [];
    var index = 0;
    while (index < 11) {
        tile_array[index] = [];
        index += 1;
    }
    while (row < 11) {
        var col = 0;
        while (col < 11) {
            var init_center = [start[0] + col * hex_width, start[1]];
            var init_tile = createTile(init_center);
            g.addVertex(init_tile);
            tile_array[row][col] = init_tile;
            var b = document.createElement("button");
            var buttons = document.getElementById("buttons");
            b.innerHTML = "Button b";
            if (buttons != null) {
                buttons.appendChild(b);
            }
            b.addEventListener("click", function () {
                alert("did something");
            });
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
        start[0] += hex_width / 2.0;
        start[1] += hex_side + .5 * hex_side;
        row += 1;
    }
    return g;
}
/*creates a single tile and returns it; takes in an array of two points
  n
nw/\ne
sw||se
  \/
  s
  The directions refer to the position of the vertices of the tile
*/
function createTile(center) {
    var nw = [center[0] - hex_width / 2.0, center[1] + -hex_side / 2.0];
    var n = [center[0] + 0.0, center[1] + -hex_side];
    var ne = [center[0] + hex_width / 2.0, center[1] + -hex_side / 2.0];
    var se = [center[0] + hex_width / 2.0, center[1] + hex_side / 2.0];
    var s = [center[0] + 0.0, center[1] + hex_side];
    var sw = [center[0] + -hex_width / 2.0, center[1] + hex_side / 2.0];
    //array of arrays of doubles
    var vertices = [nw, n, ne, se, s, sw];
    var t = new Tile(center, vertices);
    return t;
}
function drawTiles(points) {
    if (ctx != null) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.beginPath();
        var tile_map = points.getVertices();
        var iterator1 = tile_map.values();
        var k = 0;
        while (k < tile_map.size) {
            var t = iterator1.next().value;
            var vertices = t.get_vertices();
            var i = 0;
            while (i < vertices.length - 1) {
                ctx.moveTo(vertices[i][0], vertices[i][1]);
                ctx.lineTo(vertices[i + 1][0], vertices[i + 1][1]);
                ctx.stroke();
                i += 1;
            }
            ctx.moveTo(vertices[i][0], vertices[i][1]);
            ctx.lineTo(vertices[0][0], vertices[0][1]);
            ctx.stroke();
            k += 1;
        }
    }
}
drawGame();
