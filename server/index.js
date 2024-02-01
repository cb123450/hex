const { auth, requiresAuth } = require('express-openid-connect');

const express = require('express');
const app = express();

require('dotenv').config();
var path = require('path');

const https = require('https');
const fs = require('fs');

const environment = process.env.NODE_ENV;

baseurl = (environment === "production") ? "https://hexgame0.com/" : "https://localhost:443/";
console.log("baseurl: ", baseurl)
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: baseurl,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
  routes: {
    login: false,
  }
};

app.use(auth(config));

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

//server static files
app.use(express.static(path.join(__dirname, '../client-react/build')));

// index 

let MODE = (environment === "production") ? 1 : 0;

let dom = (environment === "production") ? 'https://hexgame0.com' : 'https://localhost:443';

const after_auth = dom + '/two-player';
const callback = dom + '/callback';

const isAuthenticated = (req, res, next) => {
  if (req.oidc.isAuthenticated()) {
    //pass control to the next middleware/route handler
    return next();
  } else {
    return res.status(401).json({ isAuthenticated: false });
  }
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client-react/build', 'index.html'));
});


app.get('/api/auth', isAuthenticated, (req, res) => {
  res.json({ isAuthenticated: true, user: req.oidc.user });
});


app.get('/callback', (req, res) =>
  res.oidc.callback({
    redirectUri: after_auth,
  })
);

app.post('/callback', express.urlencoded({ extended: false }), (req, res) =>
  res.oidc.callback({
    redirectUri: after_auth,
  })
);

app.get('/custom-login', function(req, res) {
  res.oidc.login({
    returnTo: after_auth,
    authorizationParams: {
      redirect_uri: callback,
    },
  })
});

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

server.listen(PORT, ()=>{
  console.log("Server running on PORT " + PORT)
});



