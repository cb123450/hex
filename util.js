var Tile = /** @class */ (function () {
    function Tile(center, vertices) {
        this.center = center;
        this.vertices = vertices;
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
    return Tile;
}());
var Graph = /** @class */ (function () {
    function Graph() {
        this.vertices = new Set;
        this.edges = new Map();
    }
    /*
    ---curr_tile is the current Tile object
    ---adj_tile is the adjacent Tile object
    */
    Graph.prototype.addEdge = function (curr_tile, adj_tile) {
        var curr_str = curr_tile.hash();
        var adj_str = adj_tile.hash();
        if (this.vertices.has(curr_str)) {
            var d = this.edges[curr_str];
            d[adj_str] = adj_tile;
        }
        else {
            this.vertices.add(curr_str);
            this.edges[curr_str] = new Map();
            var d = this.edges[curr_str];
            d[adj_str] = adj_tile;
        }
    };
    Graph.prototype.addVertex = function (curr_tile) {
        if (!this.vertices.has(curr_tile.hash())) {
            this.vertices.add(curr_tile.hash());
        }
    };
    Graph.prototype.getVertices = function () {
        return this.vertices;
    };
    Graph.prototype.getEdges = function () {
        return this.edges;
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
