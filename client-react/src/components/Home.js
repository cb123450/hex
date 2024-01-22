import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <div>
            <Link to='/solo'> Go to Solo</Link>
            </div>
            
            <div>
            <Link to='/two-player'> Go to Two Player</Link>
            </div>
            
            <div>
            <Link to='/computer'> Go to Computer</Link>
            </div>
        </div>
    );
};

export default Home;