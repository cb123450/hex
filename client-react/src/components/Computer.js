import React from 'react';
import { Link } from 'react-router-dom';

const Computer = () => {
    return (
        <div className="flex flex-col w-full space-y-4 items-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl">Computer Mode</h1>
            <Link to='/'>Go to Home</Link>
        </div>
    );
};

export default Computer;