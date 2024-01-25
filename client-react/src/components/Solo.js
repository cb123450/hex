import React, {useReducer} from 'react';
import { Link } from 'react-router-dom';
import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid';
import { css } from "@emotion/react"
import { COLORS } from "../colors.jsx"

//useReducer to manage more complex state of hexagon board

const initialState = { selectedHexes: [] };

const reducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_HEX':
            return { selectedHexes: [...state.selectedHexes, { q: action.q, r: action.r}] };
        case 'DESELECT_HEX':
            return { selectedHexes: state.selectedHexes.filter(hex => !(hex.q === action.q && hex.r === action.r)) };
        default:
            return state;
    }
}


const Solo = () => {
    const hexagons = GridGenerator.parallelogram(-5, 5, -5, 5);

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleClick = (q, r) => {
        if (state.selectedHexes.some(selectedHex => selectedHex.q === q && selectedHex.r === r)) {
            dispatch( {type: 'DESELECT_HEX', q, r})
        }
        else {
            dispatch({ type: 'SELECT_HEX', q, r });
        }
    }

    return (
            <div className="min-h-screen flex flex-col w-full h-full items-center justify-between">
                <h1 className="text-3xl md:text-4xl lg:text-5xl">Solo Mode</h1>
                <Link to='/'>Go to Home</Link>
                
                <div>
                    <HexGrid width={window.innerWidth} height={window.innerHeight}>
                    <Layout size={{ x: 4, y: 4 }} spacing={1.1} flat={false}>
                        { hexagons.map((hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} 
                        cellStyle={state.selectedHexes.some(selectedHex => selectedHex.q === hex.q && selectedHex.r === hex.r) ? {
                            fill: COLORS.red[2]} : {fill: COLORS.yellow[2]
                          }}
                        onClick={() => handleClick(hex.q, hex.r)}
                        />) }
                    </Layout>
                    </HexGrid>
                </div>
            </div>
    );
};

export default Solo;