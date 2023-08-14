const {Server} = require("socket.io")
const { Socket } = require("socket.io-client")

module.exports = {
    getio: (server) => {

        const rooms = [0, 0, 0, 0, 0, 0, 0];

        const io = new Server(server);

        io.on("connection", (server) => {
            console.log("Client has connected");

            server.on("disconnect", () => {
                console.log("Client has disconnected");
            });
            
            server.on("join", function(room_num){
                /*
                room_num is a string and is used to denote the room two players are in
                use parseInt(room_num) to index into the array of rooms!
                */
                let room = parseInt(room_num)
                
                if (room < 7 && rooms[room-1] < 2){

                    server.join(room_num)
                    server.broadcast.emit("roomJoined", room_num)

                    rooms[room-1] += 1;

                    if (rooms[room-1] == 2){
                        server.to(room_num).emit("gameStarted")
                    }
                }
                
            });

            server.on("leave", function(room_num){
                server.leave(room_num)
                server.broadcast.emit("roomLeft", room_num)
            })

            server.on("colorChange", (e) =>{
                //e.move is null
                if(e.row != null && e.col != null && e.myColor != null){
                    io.emit("colorChange", e)
                }
            });
        });

        return io;
    }
}

