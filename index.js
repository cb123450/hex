//CORRECT SERVER (index.js file)
const express = require('express')
const app = express()
const PORT = 3000;

var path = require('path')


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const http = require('http')
const server = http.createServer(app)
app.use(express.json())

const turnRoute = require('./routes/turn')
app.use('/turn', turnRoute)

const userRoute = require('./routes/user')
app.use('/user', userRoute)


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, "/public"))); 

const socketio = require("./socketio.js");
const io = socketio.getio(server)

server.listen(PORT, ()=>{
  console.log("Server running on PORT " + PORT)
}) 

