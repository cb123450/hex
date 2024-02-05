const { Server } = require("socket.io");
const  {Socket } = require("socket.io-client");

module.exports = {
    getio: (server) => {

        const room_count = [0, 0, 0, 0, 0, 0, 0];
        const curr_players = [[], [], [], [], [], [], []];

        const io = new Server(server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"],
            },
        });

        io.on("connection", (server) => {
            console.log("Client has connected");

            server.on("disconnect", () => {                
                console.log("Client has disconnected");
                //check this to see if can use to kick people from rooms
            });
            
            server.on("join", function(roomNum, player){
                /*
                roomNum is 0-indexed

                room_str is a string and player is a Player object 
                
                Player(name, color, curr_room, inGame){
                    this.id = id;
                    this.name = name;
                    this.color = color;
                    this.curr_room = curr_room;
                    this.inGame = inGame;
                }
                */   
                console.log(roomNum, room_count[roomNum])
                if (roomNum < 7 && room_count[roomNum] < 2){
                    
                    server.join(roomNum);
                    io.sockets.emit("roomJoined", roomNum);
                    
                    /* FIRST PERSON TO JOIN IS RED*/
                    player.curr_room = roomNum;

                    player.inGame = true; //player object on the server and player object on the client are different so this won't cause errors
                    if (room_count[roomNum] == 0){
                        player.color = "red";
                        curr_players[roomNum].push(player);
                    }
                    else{
                        player.color = "blue";
                        curr_players[roomNum].push(player);
                    }
                    
                    room_count[roomNum] += 1;

                    if (room_count[roomNum] == 2){
                        curr_players[0].inGame = true;
                        curr_players[1].inGame = true;
                        io.sockets.in(roomNum).emit("gameStarted", curr_players[roomNum])
                    }
                }
            });

            server.on("playerLeftRoom", function(room_num, name){
                //TODO: switch from `name` to `id` after implementing authentication

                server.leave(room_num)

                server.broadcast.emit("roomLeft", room_num)
                room_count[room_num - 1] = 0;
                curr_players[room_num - 1] = []

            });

            server.on("colorChange", (e) =>{
                if(e.row != null && e.col != null && e.myColor != null){
                    //io.emit("colorChange", e)
                    io.sockets.in(e.room_num).emit("colorChange", e)
                }
            });

            //room_num is a string
            server.on("leaveGame", function(room_num, name){
                io.sockets.in(room_num).emit("playerLeft", room_num, name);

                room_count[room_num-1] = 0;
                curr_players[room_num-1] = [];

                console.log("server received leaveGame")
            });

            server.on("getPlayers", (e) => {
                io.sockets.in(e.roomNum_0).emit("playersMessage", curr_players[roomNum_0])
            })

            //send the count of number of players in a given rooms
            server.on("getRoomCounts", () => { 
                io.emit("roomCounts", room_count);
            })

        });

        return io;
    }
}

