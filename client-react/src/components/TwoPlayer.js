import React, {useState, useReducer, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid';
import { COLORS } from "../colors.jsx"
import Player from "./Player.js"
import Games from "./Games.js"
import io from 'socket.io-client';

const initialState = { selectedHexes: [], redHexes: [], blueHexes: [], player: "Red"};

const reducer = (state, action) => {
    switch (action.type) {
        case 'RED_TURN':
            return { 
                selectedHexes: [...state.selectedHexes, { q: action.q, r: action.r}],
                redHexes: [...state.redHexes, { q: action.q, r: action.r}],
                blueHexes: [...state.blueHexes],
                player: 'Blue' 
            };
        case 'BLUE_TURN':
            state.player = "Red"
            return { 
                selectedHexes: [...state.selectedHexes, { q: action.q, r: action.r}],
                redHexes: [...state.redHexes],
                blueHexes: [...state.blueHexes, { q: action.q, r: action.r}],
                player: 'Red'
            };
        case 'RESTART':
            return {
                selectedHexes: [],
                redHexes: [],
                blueHexes: [],
                player: 'Red'
            }
    }
}

const TwoPlayer = (props) => {
    const hexagons = GridGenerator.parallelogram(-5, 5, -5, 5);

    const [state, dispatch] = useReducer(reducer, initialState);
    
    /*
    -5 -- q --- 5

    -5
    |
    r
    |
    5
    */

    const getNeighbors = (q, r) => {
       const neighbors = []

        if (q - 1 >= -5){
            neighbors.push({q: q - 1, r: r})
            if (r + 1 <= 5){
                neighbors.push({q: q-1, r: r+1})
            }
        }

        if (q + 1 <= 5){
            neighbors.push({q: q + 1, r: r})
            if (r - 1 >= -5){
                neighbors.push({q: q+1, r: r-1})
            }
        }

        if (r + 1 <= 5){
            neighbors.push({q: q, r: r+1})
        }

        if (r - 1 >= -5){
            neighbors.push({q: q, r: r-1})
        }

        return neighbors;
    }

    /*
    true for win
    false for no win
    Red connects r = -5 to r = 5
    Blue connects q = -5 to q = 5
    */
    const checkForWin = (player, hex, visited, winning_set, hexes) => {
        visited.add(`${hex.q},${hex.r}`)
        
        if (player === "Red"){
            if (hex.r === 5){
                winning_set.add(5)
            }
            if (hex.r === -5){
                winning_set.add(-5)
            }
        }
        else{
            if (hex.q === 5){
                winning_set.add(5)
            }
            if (hex.q === -5){
                winning_set.add(-5)
            }
        }

        const neighbors = getNeighbors(hex.q, hex.r);

        for (const neighbor of neighbors) {
            if (!visited.has(`${neighbor.q},${neighbor.r}`) && 
                hexes.some((_hex) => _hex.q === neighbor.q && _hex.r === neighbor.r)){
                    const ret = checkForWin(player, neighbor, visited, winning_set, hexes);
                    ret.forEach(elem => {
                        winning_set.add(elem);
                    })
                }
        }

        return winning_set;
    }

    useEffect(() => {
        const selectedHex = state.selectedHexes[state.selectedHexes.length - 1];
        if (selectedHex){
            const visited = new Set();
            const winning_set = new Set();
            const most_recent_player = state.player === "Red" ? "Blue" : "Red";
            const currentPlayerHexes = most_recent_player === "Red" ? state.redHexes : state.blueHexes; 
            const ret = checkForWin(most_recent_player, selectedHex, visited, winning_set, currentPlayerHexes);
            if (ret.has(5) && ret.has(-5)) {
                alert(most_recent_player + ' wins!')
            }
        }
    }, [state.selectedHexes])

    // useEffect(() => {
    //     const socket = io("https://localhost:443")

    //     socket.on("roomJoined", (room_num) => {

    //         let numerator = parseInt(document.getElementById("r" + room_num.toString())?.innerText?.split("/")[0]);
            
    //         // numerator should always be 0 or 1 but it's still good to check
    //         if (numerator === 0 || numerator === 1){
    //             numerator += 1;
    //             document.getElementById("r" + room_num.toString()).innerText = numerator.toString() + "/2";
    //         }
    //     });
    
    //     socket.on("roomLeft", (room_num) => {
    //         let numerator = parseInt(document.getElementById("r" + room_num.toString())?.innerText?.split("/")[0]);
            
    //         // numerator should always be 1 or 2 but it's still good to check
    //         if (numerator === 1 || numerator === 2){
    //             numerator -= 1;
    //             document.getElementById("r" + room_num.toString()).innerText = numerator.toString() + "/2";
    //         }
    //     });
    
    
    //     socket.on("gameStarted", (players) => { 
    //         //inGame, color, and curr_room are set in the server, which passes sends the new player objects here
    //         const my_index = players.map(e => e.name).indexOf(me.name);
    
    //         opponent = players[1 - my_index];
    //         me = players[my_index];
    
    //         let my_color = me.color;
    
    //         game.color = my_color;
    
    //         //mode and port are passed into this ejs file from node.js server
    //         handler = new Handler(board, game, me.curr_room, mode, "<%=port%>");
    
    //         asyncButtonHandler = handler.getAsyncButtonHandler(game.color);
    //         startHandler = handler.getStartHandler(true);
    
    //         startHandler();
    
    //         document.getElementById("opponent").innerText=opponent.name;
    //         document.getElementById("color").innerText = game.color;
    //         document.getElementById("leaveGame").style.visibility = 'visible';
    
    //     })
    
    //     socket.on("colorChange", (e) => {
    //         let row = e.row
    //         let col = e.col;
    //         let newColor = e.myColor;
            
    //         if (newColor === "red"){
    //             document.getElementById("curr").innerText="Blue";
    //         }
    //         else{
    //             document.getElementById("curr").innerText="Red";
    //         }   
    //         game.turn += 1
    //         console.log("client received colorChange")
    //         board.changeColor(row, col, newColor)
    //     })
    
    //     socket.on("playerLeft", (room_num, name) => {
    //         alert("Game is over. \"" + name + "\" has left.")
    
    //         //RESET PARAMS; player is sent from server and is empty, but keep old name
    //         me = new Player(me.name, "", -1, false);
            
    //         document.getElementById("color").innerText = "";
    //         document.getElementById("opponent").innerText = "";
    
    //         document.getElementById("leaveGame").style.visibility = "hidden";
    //         document.getElementById("r" + room_num.toString()).innerText = "0/2";
    
    //         startHandler();
    
    //         socket.emit("getTurn");
    
    //         console.log("received playerLeft")
    //     });
    
    //     socket.on("disconnect", () => {
    //         console.log("disconnect")
    //         if (me.inGame){
    //             socket.emit("leaveGame", me.curr_room, me.name);
    //         }
    //     });
    
    //     /* 
    //     Update the number of users in each room when a new user connects
    //     */
    
    //     socket.on("connect", () => {
    //         socket.emit("getRoomCounts");
    //     })
    
    //     socket.on("roomCounts", (rooms) => {
    //         let i = 1;
    //         while (i < 7){
    //             document.getElementById("r" + i.toString()).innerText = rooms[i-1].toString() + "/2";
    //             i += 1;
    //         }
    //     });
    // })

    const handleClick = (q, r) => {
        const hexAlreadySelected = state.selectedHexes.some(selectedHex => selectedHex.q === q && selectedHex.r === r);
        
        if (!hexAlreadySelected){

            const most_recent_player = state.player;
            if (state.player==="Red") {
                //component rerenders when dispatch is called
                dispatch( {type: 'RED_TURN', q, r})
            }
            if (state.player==="Blue") {
                //component rerenders when dispatch is called
                dispatch( {type: 'BLUE_TURN', q, r})
            }
        }
    }

    const handleRestart = () => {
        dispatch( {type: 'RESTART'})
    }

    return (
            <div className="min-h-screen flex flex-col w-full h-full items-center justify-between">
                <h1 className="text-3xl md:text-4xl lg:text-5xl">Two Player Mode</h1>
                <Player player={state.player}/>
                <Link to='/'>Go to Home</Link>
                
                <div className="flex flex-row items-start w-full items-center justify-start">
                    <HexGrid width={800} height={700}>
                    <Layout size={{ x: 3, y: 3 }} spacing={1.1} flat={false}>
                        { hexagons.map((hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} 
                        cellStyle={!state.selectedHexes.some(selectedHex => selectedHex.q === hex.q && selectedHex.r === hex.r) ? {
                            fill: COLORS.green[5]} : 
                            (state.redHexes.some(redHex => redHex.q === hex.q && redHex.r === hex.r)) 
                            ? {fill: COLORS.red[5]} : {fill: COLORS.blue[5]}}
                        onClick={() => handleClick(hex.q, hex.r)}
                        />) }
                    </Layout>
                    </HexGrid>
                    <Games production={props.production}/>
                </div>
                
            </div>
    );
};

export default TwoPlayer;