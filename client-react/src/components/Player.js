import React from 'react';

const Player = (props) => {
    return (
        <div className="text-xl md:text-2xl lg:text-3xl">
            <p> {props.player}'s Turn</p>
        </div>
    );
}

export default Player;