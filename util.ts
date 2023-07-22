/*
---center is [x, y] where x is the x-coord of the center 
of this tile and y is the y-coord of the center

---vertices is an array of the vertices making up the hexagon
of this tile
*/
interface Tile {
    center: Array<number>;
    vertices: Array<Array<number>>;
    get_center() : Array<number>;
    get_vertices() : Array<Array<number>>;
    hash() : string;
}
class Tile {
    constructor(center, vertices){
        this.center = center;
        this.vertices = vertices;
    }
    get_center(){
        return this.center;
    }
    get_vertices(){
        return this.vertices;
    }
    hash() : string{
        const center_str = this.center[0] + '_' + this.center[1];
        return center_str;
    }
}

/*
---node is a tile

---vertices is the set of vertices in a graph; it contains strings

--edges will be an adjacency list implemented with a hashmap. 
    --key is the string representing the center of the tile
    --value is a hashmap of its neighbors (Tile objects)

-There will be no collisions in any dictionary bc each tile has a unique center
-This graph is undirected
*/
interface Graph<T> {
    vertices;
    edges;
}

class Graph<T>{
    constructor(){
        this.vertices = new Set<T>; 
        this.edges = new Map();
    }

    /*
    ---curr_tile is the current Tile object
    ---adj_tile is the adjacent Tile object
    */
    addEdge(curr_tile, adj_tile){
        let curr_str = curr_tile.hash();
        let adj_str = adj_tile.hash();
        if (this.vertices.has(curr_str)){
            let d = this.edges[curr_str];
            d[adj_str] = adj_tile;
        }
        else{
            this.vertices.add(curr_str)
            this.edges[curr_str] = new Map<string, T>();
            let d = this.edges[curr_str];
            d[adj_str] = adj_tile;
        }
    }

    addVertex(curr_tile){
        if (!this.vertices.has(curr_tile.hash())){
            this.vertices.add(curr_tile.hash());
        }
    }
    
    getVertices() : Set<T>{
        return this.vertices;
    }

    getEdges(){
        return this.edges;
    }
}

interface Queue<T> {
    items: Array<T>;
    first_item: number;
    next_item: number;
    num_elements: number;
}
class Queue<T> implements Queue<T>{
    constructor() {
        this.items = new Array<T>;
        this.first_item = 0;
        this.next_item = 0;
        this.num_elements = 0;
    }
    enqueue(item) {
        this.items[this.next_item] = item;
        this.next_item++;
        this.num_elements += 1.
    }
    dequeue() {
        if (this.first_item < this.next_item){
            const item = this.items[this.first_item];
            this.first_item++;
            this.num_elements -= 1;
            return item;
        }
    }
    size(){
        return this.num_elements;
    }
    peek() {
        return this.items[this.first_item];
    }
    get printQueue() {
        return this.items;
    }
}