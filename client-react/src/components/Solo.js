import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { HexGrid, Layout, Hexagon, Pattern, GridGenerator } from 'react-hexgrid';


const Solo = () => {
    const hexagons = GridGenerator.parallelogram(-5, 5, -5, 5);

    const [selectedHex, setSelectedHex] = useState(null)

    const handleClick = (q, r) => {
        setSelectedHex({q, r});
    }

    const redPatternId = 'solidRed';
    const redPatternLink = 'https://htmlcolorcodes.com/colors/red/';

    return (
            <div className="min-h-screen flex flex-col w-full h-full items-center justify-between">
                <h1 className="text-3xl md:text-4xl lg:text-5xl">Solo Mode</h1>
                <Link to='/'>Go to Home</Link>
                
                <div>
                    <HexGrid width={window.innerWidth} height={window.innerHeight}>
                    <Layout size={{ x: 4, y: 4 }} spacing={1.1} flat={false}>
                        { hexagons.map((hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} 
                        fill={`url(#${redPatternId})`}
                        onClick={() => handleClick(hex.q, hex.r)}
                        />) }
                    </Layout>
                    <Pattern id={redPatternId} link={redPatternLink} />
                    </HexGrid>
                </div>
            </div>
    );
};

export default Solo;