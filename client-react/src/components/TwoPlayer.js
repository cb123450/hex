import React from 'react';
import { Link } from 'react-router-dom';

const TwoPlayer = () => {
    return (
        <div className="flex flex-col w-full space-y-4 items-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl">Two Player Mode</h1>
            <Link to='/'>Home</Link>
        </div>
    );
};

export default TwoPlayer;