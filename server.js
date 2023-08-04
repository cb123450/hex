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
          p1name:arr[0],
          p1color:"Red",
          p1move:""
        }
        let p2obj={
          p2name:arr[0],
          p2color:"Blue",
          p2move:""
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

})


app.get("/", (req,res) => {
  return res.sendFile("index.html")
})

server.listen(3000, ()=>{
  console.log("port connected to 3000")
})

