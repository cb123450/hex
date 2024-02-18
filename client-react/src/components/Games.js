import {React, useEffect, useState } from 'react';
import { isJSDocAuthorTag } from 'typescript';
import AuthenticationButton from './AuthenticationButton';
import RoomButton from './RoomButton';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';
import useWebSocket from 'react-use-websocket';

const Games = (props) => {
    const WS_URL = props.production ? "wss://localhost:443/socket": "wss://hexgame0.com/socket";
    const { isAuthenticated, user } = useAuth0();

    const chunkedRooms = [[1, 2, 3], [4, 5, 6]];

    const { webSocket } = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log('WebSocket connection established.');
        },
        onClose: () => {
            console.log('WebSocket connection closed.');
        }
    });

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(webSocket);

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [webSocket, socket]);


    return (
        <>
            <div className="flex flex-col text-l md:text-xl lg:text-2xl space-y-6"> 
                {isAuthenticated ? <div className="flex flex-row space-x-6">
                    <div className="bg-gray-200 text-gray-800 text-l md:text-xl lg:text-2xl rounded-xl p-1 md:p-2 lg:p-3">
                        <Profile name={user.name}/>
                    </div>
                </div> : null }
                <div className="flex flex-row space-x-6">
                    <div className="bg-gray-200 text-gray-800 text-l md:text-xl lg:text-2xl rounded-xl p-1 md:p-2 lg:p-3">
                        <AuthenticationButton/>
                    </div>
                </div>
                {isAuthenticated ? (
                <div className="flex flex-col space-y-6">
                    {chunkedRooms.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-row space-x-6">
                        {row.map((roomNum) => (
                        <div
                            key={roomNum}
                            className="bg-gray-200 text-gray-800 text-l md:text-xl lg:text-2xl rounded-xl p-1 md:p-2 lg:p-3"
                        >
                            <RoomButton id={user.sub} roomNum={roomNum} socket={webSocket}/>
                        </div>
                        ))}
                    </div>
                    ))}
                </div>
                ) : null}
            </div>
        </>
        
    );
}

export default Games;