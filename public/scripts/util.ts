/*----------Tile, Graph, and Queue DATA STRUCTURES---------*/

/*
---center is [x, y] where x is the x-coord of the center 
of this tile and wy is the y-coord of the center

---vertices is an array of the vertices making up the hexagon
of this tile
*/
export interface Tile {
    row: number;
    col: number;
    visited: boolean;
    color: string;
    hash() : string;
    get_visited() : boolean;
    visit();
    unvisit();
    get_color() : string;
    set_color(c : string);
}
export class Tile {
    constructor(row:number, col:number, color:string){
        this.row = row;
        this.col = col;
        this.color = color;
    }
    get_row(){
        return this.row;
    }
    get_col(){
        return this.col;
    }
    hash() : string{
        const center_str = this.row + '_' + this.col;
        return center_str;
    }
    get_visited_flag() : boolean{
        return this.visited;
    }
    visit(){
        this.visited = true;
    } 
    unvisit(){
        this.visited = false;
    }
    get_color(){
        return this.color;
    }
    set_color(c: string){
        if (c === "blue"){
            this.color = c;
        }
        else if (c === "red"){
            this.color = c;
        }
        else if (c === "#6C8"){
            this.color = c;
        }
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
export interface Graph<Hashable, T> {
    vertices;
    adj_list;
    addEdge(curr_tile, adj_tile);
    addVertex(curr_tile);
    getVertices();
    getAdjacencyList();
    unvisit_all();
}



export class Graph<Hashable, T>{
    constructor(){
        this.vertices = new Map<Hashable, T>; 
        this.adj_list = new Map<Hashable, Map<Hashable, T>>();
    }

    /*
    ---curr_tile is the current Tile object
    ---adj_tile is the adjacent Tile object
    */
    addEdge(curr_tile, adj_tile){
        let curr_str = curr_tile.hash();
        let adj_str = adj_tile.hash();

        if (!this.adj_list.has(curr_str)){
            this.adj_list.set(curr_str, undefined);
        }

        if (this.adj_list.has(curr_str) && this.adj_list[curr_str] == undefined){
            let map : Map<Hashable, T> = new Map<Hashable, T>();
            map.set(adj_str, adj_tile)
            this.adj_list[curr_str] = map;
        }
        else{
            this.adj_list[curr_str].set(adj_str, adj_tile);
        }
    }

    addVertex(curr_tile){
        if (!this.vertices.has(curr_tile.hash())){
            this.vertices.set(curr_tile.hash(), curr_tile);
        }
    }
    
    getVertices() : Map<Hashable, T>{
        return this.vertices;
    }

    getAdjacencyList() : Map<Hashable, Map<Hashable, T>>{
        return this.adj_list;
    }

    unvisitAll(){
        let iter = this.vertices.values();
        while (iter.hasNext()){
            let t : Tile = iter.next();
            t.unvisit();
        }
        
    }
}

export interface Queue<T> {
    items: Array<T>;
    first_item: number;
    next_item: number;
    num_elements: number;
}
export class Queue<T> implements Queue<T>{
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