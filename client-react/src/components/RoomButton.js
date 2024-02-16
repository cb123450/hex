import React, { useState } from 'react';


// Player(name, color, curr_room, inGame){
//     this.id = id;
//     this.name = name;
//     this.color = color;
//     this.curr_room = curr_room;
//     this.inGame = inGame;
// }

const RoomButton = (props) => {

    const roomNum_0 = props.roomNum - 1

    //fetch number of players in this room from server
    const [numPlayers, setNumPlayers] = useState(0);

    const handleClick = () => {
        
        props.socket.emit("getPlayers", roomNum_0)

        props.socket.on("playersMessage", (players) => {
            if (players.length === 0 || players[0].id !== props.id){
                
                let player = {id : props.id, name : props.given_name, color: "red", curr_room : roomNum_0, inGame: false};       
                if (players.length === 1){
                    player.color = "blue"
                }
                props.socket.emit('join', roomNum_0, player)       
            }
        })
    }

    props.socket.on("roomJoined", (room) => {

        if (room === roomNum_0) {
            let new_num = numPlayers + 1
            setNumPlayers(new_num)
        }
    });

    props.socket.on("gameStarted", (players) => {
        console.log(players[0])
        console.log(players[1])
    })

    return (
        <>
            <button onClick={handleClick}>Room {props.roomNum}
            <p>{numPlayers}/2</p>
            </button>
        </> 
    )
};

export default RoomButton;