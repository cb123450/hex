import {React, useEffect, useState } from 'react';
import { isJSDocAuthorTag } from 'typescript';
import AuthenticationButton from './AuthenticationButton';
import RoomButton from './RoomButton';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';
import useWebSocket from 'react-use-websocket';


const WS_URL = "wss://localhost:443/socket";
console.log(WS_URL)

const Games = (props) => {
    const { isAuthenticated, user } = useAuth0();

    const chunkedRooms = [[1, 2, 3], [4, 5, 6]];

    // const [socket, setSocket] = useState(null);

    // const establishWebSocketConnection = () => {
    //     const ws = new WebSocket(`${WS_URL}`);
        

    //     // Handle incoming messages
    //     ws.onmessage = (event) => {
    //       console.log(`Received message: ${event.data}`);
    //       // Handle the received message as required
    //     };
      
    //     // Handle connection open
    //     ws.onopen = () => {
    //       console.log('WebSocket connection established');
    //       // Perform any necessary actions when the connection is open
    //     };
      
    //     // Handle connection close
    //     ws.onclose = () => {
    //       console.log('WebSocket connection closed');
    //       // Perform any necessary actions when the connection is closed
    //     };
      
    //     // Handle connection errors
    //     ws.onerror = (error) => {
    //       console.error('WebSocket error:', error);
    //       // Perform any necessary error handling
    //     };
      
    //     // Return the WebSocket instance to allow interaction with it
    //     return ws;
    // };

    // const sendMessage = (message) => {
    //     if (socket && socket.readyState === WebSocket.OPEN) {
    //       socket.send(message);
    //     } else {
    //       console.error('WebSocket connection not open or not available.');
    //     }
    // };
    
    // useEffect(() => {
    //     // This block will be executed when the component mounts
    //     const wsInstance = establishWebSocketConnection();
    //     setSocket(wsInstance);

    //     sendMessage("Hi!")

    //     // This function will be called when the component unmounts
    //     return () => {
    //         if (socket) {
    //             socket.close();
    //         }
    //     };
    // }, []); // The empty dependency array means this effect runs once when the component mounts

    useWebSocket(WS_URL, {
        onOpen: () => {
          console.log('WebSocket connection established.');
        },
        onClose: () => {
            console.log('WebSocket connection closed.');
          }
      });

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
                {/* {isAuthenticated ? (
                <div className="flex flex-col space-y-6">
                    {chunkedRooms.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-row space-x-6">
                        {row.map((roomNum) => (
                        <div
                            key={roomNum}
                            className="bg-gray-200 text-gray-800 text-l md:text-xl lg:text-2xl rounded-xl p-1 md:p-2 lg:p-3"
                        >
                            <RoomButton id={user.sub} roomNum={roomNum} socket={socket}/>
                        </div>
                        ))}
                    </div>
                    ))}
                </div>
                ) : null} */}
            </div>
        </>
        
    );
}

export default Games;