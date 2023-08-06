import { convertTypeAcquisitionFromJson, visitEachChild } from "typescript";
import { deflateSync } from "zlib";
import {Tile, Graph, Queue} from "./utility.js";

export function bfs(t: Tile, color : string, tile_array : Tile[][], g : Graph<string, Tile>) : boolean{

    let visited = new Set<string>();
    let q : Queue<Tile> = new Queue<Tile>();
    q.enqueue(t);
    visited.add(t.id);

    let adj : Map<string, Map<string, Tile>> = g.getAdjacencyList();

    while (q.size() != 0){
        let samp : Tile | undefined = q.dequeue();
        if (samp != undefined){
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
export function checkWin(color : string, tile_array : Tile[][], g : Graph<string, Tile>) : boolean{

    let i : number = 0;
    while (i < 11){
        if (color == "red"){
            let check_red : boolean = bfs(tile_array[0][i], "red", tile_array, g);
            if (check_red){
                return true;
            }
        }
        else if (color == "blue"){
            let check_blue : boolean = bfs(tile_array[i][0], "blue", tile_array, g);
            if (check_blue){
                return true;
            }
        }
        i += 1;
    }
    return false; 
}

export function changeColor(row : number, col : number, color:string, tile_array : Tile [][]) : void{
    if (row >= 2 && row <= 12 && col >= 2 && col <= 12){
        let hex_container_id : string = row + '_' + col;
        let hex_container : Element | null= document.querySelector("#" + hex_container_id);

        if (hex_container != null && hex_container.className == 'false'){

            let arr : string[] = hex_container_id.split('_')

            let row = parseInt(arr[0]);
            let col = parseInt(arr[1]);

            hex_container.className = 'true';

            let hex_upper : HTMLElement | null = document.getElementById(hex_container_id + "_upper");
            let hex_middle : HTMLElement | null = document.getElementById(hex_container_id + "_middle");
            let hex_lower : HTMLElement | null = document.getElementById(hex_container_id + "_lower");

            if (hex_upper != null){
                //console.log(hex_upper.style.borderBottomColor)
                hex_upper.style.borderBottomColor = color;
                //console.log(hex_upper.style.borderBottomColor)
            }
            //middle
            if (hex_middle != null){
                hex_middle.style.background = color;
            }
            //bottom
            if (hex_lower != null){
                hex_lower.style.borderTopColor = color;
            }

            tile_array[row-2][col-2].set_color(color);
        }
    }
}

export default {bfs, checkWin, changeColor}