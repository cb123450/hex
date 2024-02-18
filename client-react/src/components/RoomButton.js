import React, { useState, useEffect } from 'react';


// Player(name, color, curr_room, inGame){
//     this.id = id;
//     this.name = name;
//     this.color = color;
//     this.curr_room = curr_room;
//     this.inGame = inGame;
// }

const RoomButton = ({id, roomNum, socket}) => {

    const roomNum_0 = roomNum - 1

    //fetch number of players in this room from server
    const [numPlayers, setNumPlayers] = useState(0);

    const handleClick = () => {
        const customMessage = {
            type: 'roomJoin',
            userId: id,
            roomNumber: roomNum,
          };
      
        // Check if the socket exists before sending the message
        if (socket && socket.sendJsonMessage) {
            console.log("Client sent: ", customMessage)
            socket.sendJsonMessage(customMessage);
        }
    }

    useEffect(() => {
        // Handle incoming messages
        if (socket && socket.lastJsonMessage) {
          console.log('Client received message:', socket.lastJsonMessage);
    
          // Check the type of the incoming message and handle accordingly
          if (socket.lastJsonMessage.type === 'roomCount') {
            console.log('roomCount Received');
            // Handle the 'roomCount' message, update state, etc.
          } else if (socket.lastJsonMessage.type === 'roomJoined') {
            console.log('roomJoined Received');
            // Handle the 'roomJoined' message, update state, etc.
          } else if (socket.lastJsonMessage.type === 'gameStarted') {
            console.log('gameStarted Received');
            // Handle the 'gameStarted' message, update state, etc.
          }
          // Add more conditions for other message types if needed
        }
      }, [socket, socket.lastJsonMessage]);

    // props.socket.on("roomJoined", (room) => {

    //     if (room === roomNum_0) {
    //         let new_num = numPlayers + 1
    //         setNumPlayers(new_num)
    //     }
    // });

    // props.socket.on("gameStarted", (players) => {
    //     console.log(players[0])
    //     console.log(players[1])
    // })

    return (
        <>
            <button onClick={handleClick}>Room {roomNum}
            <p>{numPlayers}/2</p>
            </button>
        </> 
    )
};

export default RoomButton;