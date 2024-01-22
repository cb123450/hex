import React from 'react';
import { Link } from 'react-router-dom';

const Computer = () => {
    return (
        <div>
            <h1>Computer Page</h1>
            <Link to='/'>Go to Home</Link>
        </div>
    );
};

export default Computer;