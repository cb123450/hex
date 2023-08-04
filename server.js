const express = require('express')
const app = express()
var path = require('path')
const http = require('http')
const {Server}=require("socket.io")

const server = http.createServer(app)

const io = new Server(server)
app.use(express.static("public"))

let arr=[]
let gameArr=[]


io.on("connection", (socket) =>{

  socket.on("find", (e)=>{

    if(e.name!=null){
      arr.push(e.name)

      if(arr.length>=2){
        let p1obj={
          name:arr[0],
          color:"Red",
          move:""
        }
        let p2obj={
          name:arr[1],
          color:"Blue",
          move:""
        }

        let obj={
          p1:p1obj,
          p2:p2obj
        }

        gameArr.push(obj)

        arr.splice(0, 2)
        
        io.emit("find", {game:gameArr})

      }
    }
  })


  socket.on("move", (e) =>{
    if(e.move!=null){
      io.emit("move", e.move)
    }
  })

})


app.get("/", (req,res) => {
  return res.sendFile("index.html")
})

server.listen(3000, ()=>{
  console.log("port connected to 3000")
})

