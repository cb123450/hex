import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Solo from './Solo';
import TwoPlayer from './TwoPlayer';
import Computer from './Computer';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/solo' element={<Solo />} />
                <Route path='/two-player' element={<TwoPlayer />} />
                <Route path='/computer' element={<Computer />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;