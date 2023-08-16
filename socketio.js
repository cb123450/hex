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
            });
            
            server.on("join", function(room_num, user_name){
                /*
                room_num is a string and is used to denote the room two players are in
                use parseInt(room_num) to index into the array of rooms!
                */
                let room = parseInt(room_num);
                
                if (room < 7 && rooms[room-1] < 2){

                    server.join(room_num);
                    io.sockets.emit("roomJoined", room_num);
                    
                    /* FIRST PERSON TO JOIN IS RED*/
                    if (rooms[room-1] == 0){
                        const player = {user_name: user_name, color: "red"};
                        curr_players[room].push(player);
                    }
                    else{
                        const player = {user_name: user_name, color: "blue"};
                        curr_players[room].push(player);
                    }
                    
                    rooms[room-1] += 1;

                    if (rooms[room-1] == 2){
                        io.sockets.in(room_num).emit("gameStarted", curr_players[room_num])
                    }
                }
                
            });

            server.on("playerLeftRoom", function(room_num, user_name){
                server.leave(room_num)
                server.broadcast.emit("roomLeft", room_num)

                const room = parseInt(room_num);
                rooms[room - 1] -= 1;

                const index = curr_players[room].indexOf(obj => obj.user_name === user_name);
                curr_players[room].splice(index, 1);
            });

            server.on("colorChange", (e) =>{
                //e.move is null
                if(e.row != null && e.col != null && e.myColor != null){
                    io.emit("colorChange", e)
                }
            });

            //room_num is a string
            server.on("leaveGame", function(room_num, user_name){
                const index = parseInt(room_num) - 1;
                rooms[index] = 0;
                curr_players[index] = [];

                io.sockets.in(room_num).emit("playerLeft", room_num, user_name);
            });

        });

        return io;
    }
}

