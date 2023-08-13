if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = 3000;

const http = require('http')
const server = http.createServer(app)
const socketio = require("./socketio.js");
const io = socketio.getio(server)

const turnRoute = require('./routes/turn')

app.use(express.json())
app.use('/turn', turnRoute)


const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./passport-config')

initializePassport(
  passport, 
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

var path = require('path')
//app.use(express.static("public"))

app.set('view-engine', 'ejs')

app.use(express.urlencoded({extended: false}))

app.use(flash())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

const users = []
let arr=[]
let gameArr=[]


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('pubic')
  //res.render('index.ejs', {name: "Chris"})
})

app.get('/login', (req, res) => {
  res.render('login.ejs')
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', (req, res) => {
  res.render('register.ejs')
})

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    }) 
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
  console.log(users)
})

server.listen(PORT, ()=>{
  console.log("Server running on PORT " + PORT)
}) 

