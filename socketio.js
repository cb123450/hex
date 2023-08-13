const {Server} = require("socket.io")

module.exports = {
    getio: (server) => {
        const io = new Server(server);

        io.on("connection", (socket) => {

            socket.on("find", (e)=>{
                if(e.name!=null){
                    arr.push(e.name)
            
                    if(arr.length>=2){
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
        
            socket.on("colorChange", (e) =>{
                //e.move is null
                if(e.row != null && e.col != null && e.myColor != null){
                    io.emit("colorChange", e)
                }
            })
        })

        return io;
    }
}

