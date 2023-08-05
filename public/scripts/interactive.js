import { Queue } from "./utility.js";
import { getTileArray, getTileGraph, getTurn, incrementTurn } from "./playGame.js";
export function buttonHandler(evt) {
    var tile_array = getTileArray();
    if (evt.target != null && evt.target instanceof Element) {
        let test_arr = (evt.target.id).split('_');
        let r = test_arr[0];
        let r_coord = parseInt(test_arr[1]);
        let c = test_arr[2];
        let c_coord = parseInt(test_arr[3]);
        //RECONSTRUCT hex_id
        if (r === 'r') {
            let hex_container_id = test_arr.slice(0, -1).join('_');
            let hex_container = document.querySelector("#" + hex_container_id);
            if ((hex_container === null || hex_container === void 0 ? void 0 : hex_container.className) == 'false' && r === 'r' && c === 'c' && r_coord >= 2 && r_coord <= 12 && c_coord >= 2 && c_coord <= 12) {
                let hex_upper = document.getElementById(hex_container_id + "_upper");
                let hex_middle = document.getElementById(hex_container_id + "_middle");
                let hex_lower = document.getElementById(hex_container_id + "_lower");
                //grid is not null by children are
                if (getTurn() % 2 == 0) {
                    //change to red
                    //upper
                    if (hex_upper != null) {
                        //console.log(hex_upper.style.borderBottomColor)
                        hex_upper.style.borderBottomColor = "red";
                        //console.log(hex_upper.style.borderBottomColor)
                    }
                    //middle
                    if (hex_middle != null) {
                        hex_middle.style.background = "red";
                    }
                    //bottom
                    if (hex_lower != null) {
                        hex_lower.style.borderTopColor = "red";
                    }
                    incrementTurn();
                    hex_container.className = "true";
                    tile_array[r_coord - 2][c_coord - 2].set_color("red");
                    let red_win = checkWin("red");
                    //if red wins
                    if (red_win) {
                        window.alert("Red has won!");
                        console.log("Red has won! Press the restart button to play again!");
                    }
                }
                else {
                    //change to blue
                    //upper
                    if (hex_upper != null) {
                        hex_upper.style.borderBottomColor = "blue";
                    }
                    //middle
                    if (hex_middle != null) {
                        hex_middle.style.background = "blue";
                    }
                    //bottom
                    if (hex_lower != null) {
                        hex_lower.style.borderTopColor = "blue";
                    }
                    incrementTurn();
                    hex_container.className = "true";
                    tile_array[r_coord - 2][c_coord - 2].set_color("blue");
                    let blue_win = checkWin("blue");
                    //if blue wins
                    if (blue_win) {
                        window.alert("Blue has won!");
                        console.log("Blue has won! Press the restart button to play again!");
                    }
                }
                evt.stopPropagation();
            }
        }
    }
}
export function startHandler(evt) {
    var tile_array = getTileArray();
    let r = 2;
    while (r <= 12) {
        let c = 2;
        while (c <= 12) {
            let hex_container_id = 'r_' + r + '_c_' + c;
            let hex_container = document.querySelector("#" + hex_container_id);
            if ((hex_container === null || hex_container === void 0 ? void 0 : hex_container.className) == "true") {
                hex_container.className = "false";
                let hex_upper = document.getElementById(hex_container_id + "_upper");
                let hex_middle = document.getElementById(hex_container_id + "_middle");
                let hex_lower = document.getElementById(hex_container_id + "_lower");
                if (hex_upper != null) {
                    hex_upper.style.borderBottomColor = "#6C8";
                }
                //middle
                if (hex_middle != null) {
                    hex_middle.style.background = "#6C8";
                }
                //bottom
                if (hex_lower != null) {
                    hex_lower.style.borderTopColor = "#6C8";
                }
            }
            c += 1;
        }
        r += 1;
    }
    let i = 0;
    while (i < 11) {
        let k = 0;
        while (k < 11) {
            tile_array[i][k].set_color("#6C8");
            k += 1;
        }
        i += 1;
    }
}
/*
ENUM for red player and blue player
*/
var Player;
(function (Player) {
    Player[Player["Red"] = 0] = "Red";
    Player[Player["Blue"] = 1] = "Blue";
})(Player || (Player = {}));
function bfs(t, color) {
    var tile_array = getTileArray();
    var g = getTileGraph();
    let visited = new Set();
    let q = new Queue();
    q.enqueue(t);
    visited.add(t.id);
    let adj = g.getAdjacencyList();
    while (q.size() != 0) {
        let samp = q.dequeue();
        if (samp != undefined) {
            let h = samp.id;
            let row = parseInt(h.split('_')[0]) - 2;
            let col = parseInt(h.split('_')[1]) - 2;
            //always start bfs for red player from row 0 and start bfs for blue player from col 0
            if (color == "red" && row == 10) {
                return true;
            }
            else if (color == "blue" && col == 10) {
                return true;
            }
            let neighbors = adj.get(samp.id);
            neighbors === null || neighbors === void 0 ? void 0 : neighbors.forEach((value, key) => {
                let r = parseInt(value.id.split('_')[0]) - 2;
                let c = parseInt(value.id.split('_')[1]) - 2;
                if (tile_array[r][c].get_color() == color && !visited.has(value.id)) {
                    q.enqueue(value);
                    visited.add(value.id);
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
function checkWin(color) {
    var tile_array = getTileArray();
    let i = 0;
    while (i < 11) {
        if (color == "red") {
            let check_red = bfs(tile_array[0][i], "red");
            if (check_red) {
                return true;
            }
        }
        else if (color == "blue") {
            let check_blue = bfs(tile_array[i][0], "blue");
            if (check_blue) {
                return true;
            }
        }
        i += 1;
    }
    return false;
}
