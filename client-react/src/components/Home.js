import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div className="min-h-screen flex flex-col w-full h-full space-y-12 items-center justify-start">
            <h1 className="font-bold bg-blue-800 text-white p-8 text-4xl md:text-5xl lg:text-6xl rounded-xl p-5 md:p-7 lg:p-9">HEX</h1>
            
            <div className="bg-gray-200 text-gray-800 text-xl md:text-2xl lg:text-3xl rounded-xl p-1 md:p-2 lg:p-3">
            <Link to='/solo'> Play Solo Mode</Link>
            </div>
            
            <div className="bg-gray-200 text-gray-800 text-xl md:text-2xl lg:text-3xl rounded-xl p-1 md:p-2 lg:p-3">
            <Link to='/two-player'> Play Two Player Mode</Link>
            </div>
            
            <div className="bg-gray-200 text-gray-800 text-xl md:text-2xl lg:text-3xl rounded-xl p-1 md:p-2 lg:p-3">
            <Link to='/computer'> Play Computer Mode</Link>
            </div>

            <div className="flex bg-gray-200 text-gray-800 text-md md:text-l lg:text-xl items-center rounded-xl p-1 md:p-2 lg:p-3">
                <ul className = "list-disc list-inside"> 
                    <li> Hex is a 2-player game.</li>
                    <li> Players choose a color and take turns placing hexagons on empty tiles on the board.</li>
                    <li> The first player to connect their two sides wins.</li>
                    <li> The four corners of the board belong to both adjacent sides.</li>
                    <li> On their first move the second player can swap colors with the first player.</li>
                </ul>
            </div>
        </div>
    );
};

export default Home;