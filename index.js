const { auth } = require('express-openid-connect');
const express = require('express');
require('dotenv').config();
var path = require('path');

const https = require('https');
const fs = require('fs');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};

const app = express();

const PORT = process.env.PORT;

app.use(auth(config));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// const server = http.createServer(app)

app.use(express.json())

const turnRoute = require('./routes/turn')
app.use('/turn', turnRoute)

const userRoute = require('./routes/user')
app.use('/user', userRoute)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'));

// index 
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/solo', function(req, res) {
  res.render('solo', {mode : process.env.MODE});
});

app.get('/two-player', function(req, res) {
  console.log(req.oidc.isAuthenticated());
  res.render('two-player', {mode : process.env.MODE, port : process.env.PORT,
    isAuthenticated: req.oidc.isAuthenticated()});
});

app.get('/computer', function(req, res) {
  res.render('computer', {mode : process.env.MODE});
});

app.get('/login', function(req, res) {
  console.log("test")
  res.oidc.login({
    returnTo: '/two-player',
    authorizationParams: {
      redirect_uri: 'http://localhost:80/two-player',
    },
  })
});

const options = {
  key: fs.readFileSync('key.pem', 'utf-8'),
  cert: fs.readFileSync('cert.pem', 'utf-8'),
  passphrase: process.env.SMALLSECRET,
};

//const httpServer = http.createServer(app); 
const httpsServer = https.createServer(options, app);

const socketio = require("./socketio.js");
const io = socketio.getio(httpsServer);

httpsServer.listen(PORT, ()=>{
  console.log("Server running on PORT " + PORT)
});

