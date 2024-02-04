const { auth, requiresAuth } = require('express-openid-connect');

const express = require('express');
const app = express();

require('dotenv').config();
var path = require('path');

const https = require('https');
const fs = require('fs');

// const environment = process.env.NODE_ENV;
const environment = "dev";
const { createProxyMiddleware } = require('http-proxy-middleware');

baseurl = (environment === "production") ? "https://hexgame0.com/" : "https://localhost:443/";

console.log("baseurl: ", baseurl)

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const PORT = 443;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const turnRoute = require('./routes/turn')
app.use('/turn', turnRoute)

const userRoute = require('./routes/user')
app.use('/user', userRoute)

// index 

let MODE = (environment === "production") ? 1 : 0;

let dom = (environment === "production") ? 'https://hexgame0.com' : 'https://localhost:443';

const after_auth = dom + '/two-player';
const callback = dom + '/callback';

let options;

const { exec } = require('child_process');


if (environment === 'production'){
  options = {
    key: fs.readFileSync('/etc/letsencrypt/live/hexgame0.com/privkey.pem', 'utf-8'),
    cert: fs.readFileSync('/etc/letsencrypt/live/hexgame0.com/fullchain.pem', 'utf-8'),
  };
}
else{
  options = {
    key: fs.readFileSync('key.pem', 'utf-8'),
    cert: fs.readFileSync('cert.pem', 'utf-8'),
    passphrase: process.env.SMALLSECRET,
  };
}

const server = https.createServer(options, app);
const socketio = require("./socketio.js");

const io = socketio.getio(server);


// Forward requests to React development server during development
if (environment !== 'production') {
  const proxy = createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    cache: false,
    wss: true, // Enable WebSocket support
  });

  app.use('*', (req, res, next) => {
    console.log("HERE")
    proxy(req, res, next);
  });
}

// Serve static files in production
if (environment === 'production') {
  app.use(express.static(path.join(__dirname, '../client-react/build')));

  // Serve the React app for all routes in production
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client-react/build', 'index.html'));
  });
}

server.listen(PORT, ()=>{
  console.log("Server running on PORT " + PORT)
});



