var side_length = window.innerWidth/55;
var root3 = 1.73205;
var height = 2*side_length;
var width = root3*side_length;
var border_bottom_top = side_length - (side_length/2.0);
var border_left_right = (root3/2.0)*side_length;

var grid_container = document.getElementById("grid");

//START----------Tile, Graph, and Queue DATA STRUCTURES---------

/*
---center is [x, y] where x is the x-coord of the center 
of this tile and y is the y-coord of the center

---vertices is an array of the vertices making up the hexagon
of this tile
*/
interface Tile {
    row: number;
    col: number;
    visited: boolean;
    hash() : string;
    get_visited() : boolean;
    visit();
    unvisit();
}
class Tile {
    constructor(row, col){
        this.row = row;
        this.col = col;
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
interface Graph<Hashable, T> {
    vertices;
    adj_list;
    addEdge(curr_tile, adj_tile);
    addVertex(curr_tile);
    getVertices();
    getAdjacencyList();
    unvisit_all();
}

class Graph<Hashable, T>{
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

        if (this.vertices.has(curr_str)){
            this.adj_list[curr_str][adj_str] = adj_tile;
        }
        else{
            this.vertices.set(curr_str, curr_tile);
            this.adj_list[curr_str] = new Map<Hashable, T>;
            this.adj_list[curr_str][adj_str] = adj_tile;
        }
    }

    addVertex(curr_tile){
        if (!this.vertices.has(curr_tile.hash())){
            this.vertices.set(curr_tile.hash(), curr_tile);
            this.adj_list[curr_tile.hash()] = new Map<Hashable, T>;
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
//END----------Tile, Graph, and Queue DATA STRUCTURES---------

function drawBoard() : Tile[][] {
    //Create tile array to aid in creaetion of graph
    let tile_array : Tile[][] = [];
    var index : number = 0;
    while (index < 11){
        tile_array[index] = [];
        index += 1;
    }

    if (grid_container != null){
        grid_container.style.gridTemplateRows = "5% repeat(20, minmax(" + height + "px, " + height + "px))";
        grid_container.style.gridTemplateColumns = "repeat(25, minmax(" + width + "px, " + width + "px))";
    }

    /* Listen to parent of the tiles to improve efficiency */
    grid_container?.addEventListener("click", buttonHandler, false);

    var row : number = 1;
    while (row < 14){
        var col : number = 1;

        while (col < 14){
            //Create new html element
            var hex_container : HTMLDivElement = document.createElement("div");
            hex_container.id = 'r_' + row + '_c_' + col;
            hex_container.className = "false";

            grid_container?.appendChild(hex_container);

            var sheet = window.document.styleSheets[0];

            var num = col + row;
            var right_offset = (width/2.0)*(row-1);
            var top_offset = -6 * (row-1);

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

            
            if (row == 1 && col >= 3){
                //TOP BORDER
                var upper_border : HTMLDivElement = document.createElement("div");            
                upper_border.id = hex_container.id + "_upper_border";
                hex_container.appendChild(upper_border);

                var style_upper_border = '#' + upper_border.id
                + ' {\n' 
                + 'width: 0;'
                + 'position: relative;'
                + 'left: ' + -width/2.0 + 'px;'
                + 'z-index: -1;'
                + 'top: ' + height/1.25 + 'px;'
                + 'border-bottom: ' +  side_length/2.0 + 'px solid red;'
                + 'border-top: ' +  side_length/4.0 + 'px solid red;'
                + 'border-left: ' + width/2.0 + 'px solid red;'
                + 'border-right: ' + width/2.0 + 'px solid red;'
                + '\n}';
                sheet.insertRule(style_upper_border, sheet.cssRules.length);
            }
            else if (row == 13 && col >= 2 && col <= 12){
                //BOTTOM BORDER
                var lower_border : HTMLDivElement = document.createElement("div");            
                lower_border.id = hex_container.id + "_lower_border";
                hex_container.appendChild(lower_border);

                var style_lower_border = '#' + lower_border.id
                + ' {\n' 
                + 'width: 0;'
                + 'position: relative;'
                + 'left: ' + -width/1.7 + 'px;'
                + 'z-index: -1;'
                + 'top: ' + - height/9.0 + 'px;'
                + 'border-bottom: ' +  side_length/2.8 + 'px solid red;'
                + 'border-top: ' +  side_length/4.0 + 'px solid red;'
                + 'border-left: ' + width/2.0 + 'px solid red;'
                + 'border-right: ' + width/2.0 + 'px solid red;'
                + '\n}';
                sheet.insertRule(style_lower_border, sheet.cssRules.length);
            }
            else if (col == 1 && row >= 3){
                //LEFT BORDER
                var left_border : HTMLDivElement = document.createElement("div");            
                left_border.id = hex_container.id + "_left_border";
                hex_container.appendChild(left_border);

                const rotation: number = 6.0/36.0;
                
                var style_left_border = '#' + left_border.id
                + ' {\n' 
                + 'width: 0;'
                + 'position: relative;'
                + 'left: ' + width/7.5 + 'px;'
                + 'z-index: -1;'
                + 'top: ' + -height/3.4 + 'px;'
                + 'border-bottom: ' +  side_length/2.8 + 'px solid blue;'
                + 'border-top: ' +  side_length/4.0 + 'px solid blue;'
                + 'border-left: ' + width/2.0 + 'px solid blue;'
                + 'border-right: ' + width/2.0 + 'px solid blue;'
                + 'transform: rotate(' + rotation + 'turn);'
                + '\n}';
                sheet.insertRule(style_left_border, sheet.cssRules.length);
            }
            else if (col == 13 && row <= 12){
                //RIGHT BORDER
                var right_border : HTMLDivElement = document.createElement("div");            
                right_border.id = hex_container.id + "_right_border";
                hex_container.appendChild(right_border);

                const rotation: number = 6.0/36.0;
                
                if (row == 1){

                }
                var style_right_border = '#' + right_border.id
                + ' {\n' 
                + 'width: 0;'
                + 'position: relative;'
                + 'left: ' + -width/1.4 + 'px;'
                + 'z-index: -1;'
                + 'top: ' + height/6.5 + 'px;'
                + 'border-bottom: ' +  side_length/2.8 + 'px solid blue;'
                + 'border-top: ' +  side_length/4.0 + 'px solid blue;'
                + 'border-left: ' + width/2.0 + 'px solid blue;'
                + 'border-right: ' + width/2.0 + 'px solid blue;'
                + 'transform: rotate(' + rotation + 'turn);'
                + '\n}';
                sheet.insertRule(style_right_border, sheet.cssRules.length);

            }
            else if (row > 1 && row < 13 && col > 1 && col < 13){

                //UPPER
                var upper : HTMLDivElement = document.createElement("div");
                upper.id = hex_container.id + "_upper";
                hex_container.appendChild(upper);

                var style_upper = '#' + upper.id + 
                ' {\n' 
                + 'width: 0;'
                + 'border-bottom: ' + border_bottom_top+ 'px solid #6C8;'
                + 'border-left: ' + border_left_right+ 'px solid transparent;'
                + 'border-right: ' + border_left_right+ 'px solid transparent;'
                + '\n}';
                sheet.insertRule(style_upper, sheet.cssRules.length);


                //MIDDLE
                var middle : HTMLDivElement = document.createElement("div");
                middle.id = hex_container.id + "_middle";
                hex_container.appendChild(middle);


                var style_middle = '#' + middle.id + 
                ' {\n' 
                + 'grid-column: ' + col + ';\n' 
                + 'grid-row: ' + row + ';\n'
                + 'width: ' + width + 'px;\n' 
                + 'height: ' + side_length + 'px;\n' 
                + 'background: #6C8;'
                +'\n}';
                sheet.insertRule(style_middle, sheet.cssRules.length);

                //LOWER
                var lower : HTMLDivElement = document.createElement("div");
                lower.id = hex_container.id + "_lower";    
                hex_container.appendChild(lower);

                var style_lower = '#' + lower.id + 
                ' {\n' 
                + 'width: 0;'
                + 'border-top: ' + border_bottom_top+ 'px solid #6C8;'
                + 'border-left: ' + border_left_right+ 'px solid transparent;'
                + 'border-right: ' + border_left_right+ 'px solid transparent;'
                + '\n}';
                sheet.insertRule(style_lower, sheet.cssRules.length);

                //CREATE TILE ARRAY
                tile_array[row-2][col-2] = new Tile(row, col);
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
function createTiles(t : Tile[][]) : Graph<string, Tile>{

    var tile_array: Tile[][] = t;
    
    let g = new Graph<string, Tile>();

    var row : number = 0;

    while (row < 11){
        var col : number = 0;
        while (col < 11){
            g.addVertex(tile_array[row][col]);

            if (col >= 1){
                //add an edge between left neighbor of this tile and curr tile
                g.addEdge(tile_array[row][col], tile_array[row][col-1]);
                g.addEdge(tile_array[row][col-1], tile_array[row][col]);
            }
            if (row >= 1){
                //add an edge between NW neighbor of this tile and curr tile
                g.addEdge(tile_array[row-1][col], tile_array[row][col]);
                g.addEdge(tile_array[row][col], tile_array[row-1][col]);

                if (col < 10){
                    //add an edge between NE neighbor of this tile and curr tile
                    g.addEdge(tile_array[row-1][col+1], tile_array[row][col]);
                    g.addEdge(tile_array[row][col], tile_array[row-1][col+1]);
                }
            }
            col += 1;
        }
        row += 1;
    }

    return g; 
    
}

var turn: number = 0;

function buttonHandler(evt){
    
    let test_arr = (evt.target.id).split('_');

    let r : string = test_arr[0];
    let r_coord : number = parseInt(test_arr[1]);
    let c : string = test_arr[2];
    let c_coord : number = parseInt(test_arr[3]);

    //RECONSTRUCT hex_id
    let hex_container_id : string = test_arr.slice(0, -1).join('_');
    console.log(hex_container_id)
    let hex_container = document.querySelector("#" + hex_container_id);


    if (hex_container?.className == 'false' && r === 'r' && c === 'c' && r_coord >= 2 && r_coord <= 12 && c_coord >= 2 && c_coord <= 12){
        let hex_upper : HTMLElement | null = document.getElementById(hex_container_id + "_upper");
        let hex_middle : HTMLElement | null = document.getElementById(hex_container_id + "_middle");
        let hex_lower : HTMLElement | null = document.getElementById(hex_container_id + "_lower");

        //grid is not null by children are
        if (turn % 2 == 0){
            //change to red
            //upper
            if (hex_upper != null){
                hex_upper.style.borderBottomColor = "red";
            }
            //middle
            if (hex_middle != null){
                hex_middle.style.background = "red";
            }
            //bottom
            if (hex_lower != null){
                hex_lower.style.borderTopColor = "red";
            }
            turn += 1;
            hex_container.className = "true";
        }
        else{
            //change to blue
            //upper
            if (hex_upper != null){
                hex_upper.style.borderBottomColor = "blue";
            }
            //middle
            if (hex_middle != null){
                hex_middle.style.background = "blue";
            }
            //bottom
            if (hex_lower != null){
                hex_lower.style.borderTopColor = "blue";
            }
            turn += 1;
            hex_container.className = "true";
        }
        evt.stopPropagation();
    }
}

/*
ENUM for red player and blue player
*/
enum Player {
    Red = 0,
    Blue = 1,
}

/*
* Checks if a player has won
* Returns true if 'player' has won and false if not
*/
function checkWin(player : Player){
    return false;
}

/*
* Run the game
* Red goes first and moves on even turn numbers 0, 2, 4, ...
*/
function playGame(){
    let tile_array : Tile[][] = drawBoard();
    let g : Graph<string, Tile> = createTiles(tile_array);  
    
    let count : number = 0;
    let curr_player : Player = Player.Red;

    while (count < 100){
        

        count += 1;
    }
}

playGame();
/*
if (winner % 2 == 1){
    //RED PLAYER HAS WON
}
else{
    //BLUE PLAYER HAS WON
}
*/






