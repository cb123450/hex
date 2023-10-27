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
            
            server.on("join", function(room_num, player){
                /*
                room_str is a string and player is a Player object as defined in two-player.ejs
                function Player(name, color, curr_room, inGame){
                    this.name = name;
                    this.color = color;
                    this.curr_room = curr_room;
                    this.inGame = inGame;
                }
                */                
                if (room_num < 7 && rooms[room_num-1] < 2){

                    server.join(room_num);
                    io.sockets.emit("roomJoined", room_num);
                    
                    /* FIRST PERSON TO JOIN IS RED*/
                    player.curr_room = room_num;

                    player.inGame = true; //player object on the server and player object on the client are different so this won't cause errors
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

            server.on("playerLeftRoom", function(room_num, name){
                //TODO: switch from `name` to `id` after implementing authentication

                server.leave(room_num)

                server.broadcast.emit("roomLeft", room_num)
                rooms[room_num - 1] -= 1;

                const index = curr_players[room_num].indexOf(obj => obj.name === name);
                curr_players[room_num].splice(index, 1); 
                /*delete one object starting at index `index
                you actually don't need to splice because `playerLeftRoom` event can 
                only be sent from the client side when only 1 player has joined the room
                Maybe allow observers into rooms and add chat feature later on
                */
            });

            server.on("colorChange", (e, room_num) =>{
                if(e.row != null && e.col != null && e.myColor != null){
                    //io.emit("colorChange", e)
                    io.sockets.in(e.room_num).emit("colorChange", e)
                }
            });

            //room_num is a string
            server.on("leaveGame", function(room_num, name){
                io.sockets.in(room_num).emit("playerLeft", room_num, name);

                const index = room_num - 1;
                rooms[index] = 0;
                curr_players[index] = [];

                console.log("server received leaveGame")
            });

            //send the count of number of players in a given rooms
            server.on("getRoomCounts", () => { 
                io.emit("roomCounts", rooms);
            })

        });

        return io;
    }
}

