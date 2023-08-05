import { visitEachChild } from "typescript";
import { deflateSync } from "zlib";
import {Tile, Graph, Queue} from "./utility.js";
import { getTileArray, getTileGraph, getTurn, incrementTurn} from "./playGame.js";

export function buttonHandler(evt: Event){

    var tile_array = getTileArray();
    
    if (evt.target != null && evt.target instanceof Element){
        let test_arr = (evt.target.id).split('_');

        let r : string = test_arr[0];
        let r_coord : number = parseInt(test_arr[1]);
        let c : string = test_arr[2];
        let c_coord : number = parseInt(test_arr[3]);

        //RECONSTRUCT hex_id

        if (r === 'r'){
            let hex_container_id : string = test_arr.slice(0, -1).join('_');
            let hex_container = document.querySelector("#" + hex_container_id);


            if (hex_container?.className == 'false' && r === 'r' && c === 'c' && r_coord >= 2 && r_coord <= 12 && c_coord >= 2 && c_coord <= 12){
                let hex_upper : HTMLElement | null = document.getElementById(hex_container_id + "_upper");
                let hex_middle : HTMLElement | null = document.getElementById(hex_container_id + "_middle");
                let hex_lower : HTMLElement | null = document.getElementById(hex_container_id + "_lower");

                //grid is not null by children are
                if (getTurn() % 2 == 0){
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

                    incrementTurn();

                    hex_container.className = "true";

                    tile_array[r_coord-2][c_coord-2].set_color("red");

                    let red_win: boolean = checkWin("red");

                    //if red wins
                    if (red_win){
                        window.alert("Red has won!")
                        console.log("Red has won! Press the restart button to play again!")
                    }
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

                    
                    incrementTurn();

                    hex_container.className = "true";
                    tile_array[r_coord-2][c_coord-2].set_color("blue");
                    let blue_win: boolean = checkWin("blue");

                    //if blue wins
                    if (blue_win){
                        window.alert("Blue has won!")
                        console.log("Blue has won! Press the restart button to play again!")
                    }
                }
                evt.stopPropagation();
            }
        }
    }
}


export function startHandler(evt : Event){

    var tile_array = getTileArray();

    let r : number = 2;
    while (r <= 12){
        let c : number = 2;
        while (c <= 12){
            let hex_container_id : string = 'r_' + r + '_c_' + c;
            let hex_container = document.querySelector("#" + hex_container_id);
            if (hex_container?.className == "true"){
                hex_container.className = "false";

                let hex_upper : HTMLElement | null = document.getElementById(hex_container_id + "_upper");
                let hex_middle : HTMLElement | null = document.getElementById(hex_container_id + "_middle");
                let hex_lower : HTMLElement | null = document.getElementById(hex_container_id + "_lower");  

                if (hex_upper != null){
                    hex_upper.style.borderBottomColor = "#6C8";
                }
                //middle
                if (hex_middle != null){
                    hex_middle.style.background = "#6C8";
                }
                //bottom
                if (hex_lower != null){
                    hex_lower.style.borderTopColor = "#6C8";
                }
            }
            c += 1;
        }
        r += 1;
    }
    let i : number = 0;
    while (i < 11){
        let k : number = 0;
        while (k < 11){
            tile_array[i][k].set_color("#6C8");
            k += 1;
        }
        i += 1;
    }
}
/*
ENUM for red player and blue player
*/
enum Player {
    Red = 0,
    Blue = 1,
}


function bfs(t: Tile, color : string) : boolean{

    var tile_array = getTileArray();
    var g = getTileGraph();

    let visited = new Set<string>();
    let q : Queue<Tile> = new Queue<Tile>();
    q.enqueue(t);
    visited.add(t.id);

    let adj : Map<string, Map<string, Tile>> = g.getAdjacencyList();

    while (q.size() != 0){
        let samp : Tile | undefined = q.dequeue();
        if (samp != undefined){
            //console.log(samp)
            let h : string = samp.id;
            let row : number = parseInt(h.split('_')[0])-2;
            let col : number = parseInt(h.split('_')[1])-2;
            //always start bfs for red player from row 0 and start bfs for blue player from col 0
            if (color == "red" && row == 10){
                return true;
            }
            else if (color == "blue" && col == 10){
                return true;
            }

            let neighbors : Map<string, Tile> | undefined = adj.get(samp.id);
            
            neighbors?.forEach((value, key) => {
                let r : number = parseInt(value.id.split('_')[0])-2;
                let c : number = parseInt(value.id.split('_')[1])-2;

                if (tile_array[r][c].get_color() == color && !visited.has(value.id)){  
                    q.enqueue(value);
                    visited.add(value.id)
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
function checkWin(color : string) : boolean{

    var tile_array = getTileArray();
    let i : number = 0;
    while (i < 11){
        if (color == "red"){
            let check_red : boolean = bfs(tile_array[0][i], "red");
            //console.log("red")
            if (check_red){
                return true;
            }
        }
        else if (color == "blue"){
            let check_blue : boolean = bfs(tile_array[i][0], "blue");
            //console.log("blue")
            if (check_blue){
                return true;
            }
        }
        i += 1;
    }
    return false; 
}