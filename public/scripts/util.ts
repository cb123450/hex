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
    id: string;
    get_visited() : boolean;
    visit() : void;
    unvisit() : void;
    get_color() : string;
    set_color(c : string) : void;
}
export class Tile {
    constructor(row:number, col:number, color:string){
        this.row = row;
        this.col = col;
        this.color = color;
        this.id = row + '_' + col;
    }
    get_row(){
        return this.row;
    }
    get_col(){
        return this.col;
    }
    get_visited_flag() : boolean{
        return this.visited;
    }
    visit() : void{
        this.visited = true;
    } 
    unvisit() : void{
        this.visited = false;
    }
    get_color() : string{
        return this.color;
    }
    set_color(c: string) : void{
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
export interface Graph<H extends string, T extends Tile> {
    vertices : Map<H, T>;
    adj_list : Map<H, Map<H, T>>;
    addEdge(curr_tile : T, adj_tile : T): void;
    addVertex(curr_tile : T) : void;
    getVertices() : Map<H, T>;
    getAdjacencyList() : Map<H, Map<H, T>>;
    unvisit_all() : void;
}



export class Graph<H extends string, T extends Tile>{
    constructor(){
        this.vertices = new Map<H, T>; 
        this.adj_list = new Map<H, Map<H, T>>();
    }

    /*
    ---curr_tile is the current Tile object
    ---adj_tile is the adjacent Tile object
    */
    addEdge(curr_tile : T, adj_tile : T): void{
        let curr_str : string = curr_tile.id;
        let adj_str : string = adj_tile.id;

        if (!this.adj_list.has(curr_str as H)){
            let map : Map<H, T> = new Map<H, T>();
            this.adj_list.set(curr_str as H, map);
        }
        else{
            if (this.adj_list.get(curr_str as H) != null){
                this.adj_list.get(curr_str as H)?.set(adj_str as H, adj_tile);
            }

        }
    }

    addVertex(curr_tile : T) : void{
        if (!this.vertices.has(curr_tile.id as H)){
            this.vertices.set(curr_tile.id as H, curr_tile);
        }
    }
    
    getVertices() : Map<H, Tile>{
        return this.vertices;
    }

    getAdjacencyList() : Map<H, Map<H, Tile>>{
        return this.adj_list;
    }

    unvisit_all() : void{
        let iter = this.vertices.values();

        for (const val of iter){
            val.unvisit();
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
    enqueue(item : T) {
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