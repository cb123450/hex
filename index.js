const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)
var path = require('path')
app.use(express.static("public"))

let arr=[]
let gameArr=[]
let turn;

const PORT = 3000;

io.on("connection", (socket) =>{

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


app.use(express.json())

app.get("/turn", (req, res) => {
  //console.log("get: " + turn)
  res.send(turn);
})

app.post('/turn', (req, res) => {
  turn = req.body.turn;
  //console.log("post: " + turn)
  res.send(req.body)
})

server.listen(PORT, ()=>{
  console.log("Server running on PORT " + PORT)
})

