/*----------Tile, Graph, and Queue DATA STRUCTURES---------*/
export class Tile {
    constructor(row, col, color) {
        this.row = row;
        this.col = col;
        this.color = color;
        this.id = row + '_' + col;
    }
    get_row() {
        return this.row;
    }
    get_col() {
        return this.col;
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
export class Graph {
    constructor() {
        this.vertices = new Map;
        this.adj_list = new Map();
    }
    /*
    ---curr_tile is the current Tile object
    ---adj_tile is the adjacent Tile object
    */
    addEdge(curr_tile, adj_tile) {
        var _a;
        let curr_str = curr_tile.id;
        let adj_str = adj_tile.id;
        if (!this.adj_list.has(curr_str)) {
            let map = new Map();
            this.adj_list.set(curr_str, map);
        }
        else {
            if (this.adj_list.get(curr_str) != null) {
                (_a = this.adj_list.get(curr_str)) === null || _a === void 0 ? void 0 : _a.set(adj_str, adj_tile);
            }
        }
    }
    addVertex(curr_tile) {
        if (!this.vertices.has(curr_tile.id)) {
            this.vertices.set(curr_tile.id, curr_tile);
        }
    }
    getVertices() {
        return this.vertices;
    }
    getAdjacencyList() {
        return this.adj_list;
    }
    unvisit_all() {
        let iter = this.vertices.values();
        for (const val of iter) {
            val.unvisit();
        }
    }
}
export class Queue {
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
