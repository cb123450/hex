const {Server} = require("socket.io")
const { Socket } = require("socket.io-client")

module.exports = {
    getio: (server) => {
        const users = []
        let arr=[]
        let gameArr=[]

        const io = new Server(server);

        io.on("connection", (server) => {
            console.log("Client has connected");

            server.on("disconnect", () => {
                console.log("Client has disconnected");
            })

            server.on("find", (e) => {
                console.log("server recieved find")
                if(e.name!=null){
                    arr.push(e.name)
            
                    if (arr.length >= 2){
                        let p1obj={
                            name:arr[0],
                            color:"red",
                        }
                        let p2obj={
                            name:arr[1],
                            color:"blue",
                        }
                
                        let obj={
                            p1:p1obj,
                            p2:p2obj
                        }
                        turn = "red"
                        gameArr.push(obj)
                
                        arr.splice(0, 2)
                        
                        io.emit("find", {game:gameArr})
                    }
                }
            })
        
            server.on("colorChange", (e) =>{
                //e.move is null
                if(e.row != null && e.col != null && e.myColor != null){
                    io.emit("colorChange", e)
                }
            })

            server.on("join", () => {
                server.join("roomA")
            })
        })

        return io;
    }
}

