import React, {useState, useReducer, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid';
import { COLORS } from "../colors.jsx"
import Player from "./Player.js"
import Games from "./Games.js"

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

const TwoPlayer = () => {
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
                    <Games/>
                </div>
                
            </div>
    );
};

export default TwoPlayer;