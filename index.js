const express = require('express')
const app = express()
const PORT = 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const http = require('http')
const server = http.createServer(app)


const turnRoute = require('./routes/turn')
app.use(express.json())
app.use('/turn', turnRoute)

var path = require('path')
app.use(express.static("public"))

const socketio = require("./socketio.js");
const io = socketio.getio(server)

server.listen(PORT, ()=>{
  console.log("Server running on PORT " + PORT)
}) 

