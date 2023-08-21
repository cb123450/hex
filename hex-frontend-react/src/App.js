import React, { Component } from 'react';
import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid';
import './App.css';


class App extends Component {
  render() {
    const hexagons = GridGenerator.parallelogram(-5, 6, -5, 6);

    return (
      <div className="App">
        <h1 Hex></h1>
        <HexGrid width={1200} height={1000}>
          <Layout size={{x : 11, y : 11}}>
            {hexagons.map((hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} />)}
          </Layout>
        </HexGrid>
      </div>
    );
  }
}

export default App;
