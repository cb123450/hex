/*
//USER AUTHENTICATION STUFF
const express = require('express')
var path = require('path')

const app = express()

const bcrypt = require('bcrypt')

app.use(express.static("public"));
app.use(express.json())
app.set("view engine", "ejs")

const users = []

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = { name: req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
    
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name == req.body.name)
    if (user == null){
        return res.status(400).send("Cannot find user")
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)){
            res.send("success")
        }
        else{
            res.send("not allowed")
        }
    }
    catch {
        res.status(500).send()
    }
})
*/
//WEBSOCKET STUFF
const io = require('socket.io')(3000)
io.on('connection', socket => {
    socket.emit('chat-message', "Hello World")
})

//app.listen(3000)
