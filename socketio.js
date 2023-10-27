const {Server} = require("socket.io")
const { Socket } = require("socket.io-client")

module.exports = {
    getio: (server) => {

        const rooms = [0, 0, 0, 0, 0, 0, 0];
        const curr_players = [[], [], [], [], [], [], []];

        const io = new Server(server);

        io.on("connection", (server) => {
            console.log("Client has connected");

            server.on("disconnect", () => {                
                console.log("Client has disconnected");
                //checkt this to see if can use to kick people from rooms
            });
            
            server.on("join", function(room_str, player){
                /*
                room_str is a string and player is a Player object as defined in two-player.ejs
                const player = {name : "",  
                    color : "",
                    curr_room : -1,
                    inGame: false
                    }
                */
                let room_num = parseInt(room_str);
                
                if (room_num < 7 && rooms[room_num-1] < 2){

                    server.join(room_num);
                    io.sockets.emit("roomJoined", room_num);
                    
                    /* FIRST PERSON TO JOIN IS RED*/
                    if (rooms[room_num-1] == 0){
                        player.color = "red";
                        curr_players[room_num].push(player);
                    }
                    else{
                        player.color = "blue";
                        curr_players[room_num].push(player);
                    }
                    
                    rooms[room_num-1] += 1;

                    if (rooms[room_num-1] == 2){
                        io.sockets.in(room_num).emit("gameStarted", curr_players[room_num])
                    }
                }
                
            });

            server.on("playerLeftRoom", function(room_str, name){
                //TODO: switch from `name` to `id` after implementing authentication

                const room_num = parseInt(room_str);
                server.leave(room_num)

                server.broadcast.emit("roomLeft", room_str)
                rooms[room_num - 1] -= 1;

                const index = curr_players[room_num].indexOf(obj => obj.name === name);
                curr_players[room_num].splice(index, 1);
            });

            server.on("colorChange", (e, room_num) =>{
                if(e.row != null && e.col != null && e.myColor != null){
                    //io.emit("colorChange", e)
                    io.sockets.in(e.room_num).emit("colorChange", e)
                }
            });

            //room_num is a string
            server.on("leaveGame", function(room_num, user_name){
                const index = parseInt(room_num) - 1;
                rooms[index] = 0;
                curr_players[index] = [];

                io.sockets.in(room_num).emit("playerLeft", room_num, user_name);
                console.log("server received leaveGame")
            });

            server.on("getTurn", () => { 
                io.emit("rooms", rooms);
            })

        });

        return io;
    }
}

