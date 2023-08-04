"use strict";
/*----------Tile, Graph, and Queue DATA STRUCTURES---------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = exports.Graph = exports.Tile = void 0;
class Tile {
    constructor(row, col, color) {
        this.row = row;
        this.col = col;
        this.color = color;
    }
    get_row() {
        return this.row;
    }
    get_col() {
        return this.col;
    }
    hash() {
        const center_str = this.row + '_' + this.col;
        return center_str;
    }
    get_visited_flag() {
        return this.visited;
    }
    visit() {
        this.visited = true;
    }
    unvisit() {
        this.visited = false;
    }
    get_color() {
        return this.color;
    }
    set_color(c) {
        if (c === "blue") {
            this.color = c;
        }
        else if (c === "red") {
            this.color = c;
        }
        else if (c === "#6C8") {
            this.color = c;
        }
    }
}
exports.Tile = Tile;
class Graph {
    constructor() {
        this.vertices = new Map;
        this.adj_list = new Map();
    }
    /*
    ---curr_tile is the current Tile object
    ---adj_tile is the adjacent Tile object
    */
    addEdge(curr_tile, adj_tile) {
        let curr_str = curr_tile.hash();
        let adj_str = adj_tile.hash();
        if (!this.adj_list.has(curr_str)) {
            this.adj_list.set(curr_str, undefined);
        }
        if (this.adj_list.has(curr_str) && this.adj_list[curr_str] == undefined) {
            let map = new Map();
            map.set(adj_str, adj_tile);
            this.adj_list[curr_str] = map;
        }
        else {
            this.adj_list[curr_str].set(adj_str, adj_tile);
        }
    }
    addVertex(curr_tile) {
        if (!this.vertices.has(curr_tile.hash())) {
            this.vertices.set(curr_tile.hash(), curr_tile);
        }
    }
    getVertices() {
        return this.vertices;
    }
    getAdjacencyList() {
        return this.adj_list;
    }
    unvisitAll() {
        let iter = this.vertices.values();
        while (iter.hasNext()) {
            let t = iter.next();
            t.unvisit();
        }
    }
}
exports.Graph = Graph;
class Queue {
    constructor() {
        this.items = new Array;
        this.first_item = 0;
        this.next_item = 0;
        this.num_elements = 0;
    }
    enqueue(item) {
        this.items[this.next_item] = item;
        this.next_item++;
        this.num_elements += 1.;
    }
    dequeue() {
        if (this.first_item < this.next_item) {
            const item = this.items[this.first_item];
            this.first_item++;
            this.num_elements -= 1;
            return item;
        }
    }
    size() {
        return this.num_elements;
    }
    peek() {
        return this.items[this.first_item];
    }
    get printQueue() {
        return this.items;
    }
}
exports.Queue = Queue;
