import express from 'express';
const socketio = require("./socketio.js");
import http from "http";
var mysql = require('mysql');
import router from "router";

import compression from 'compression';
import bodyParser from "body-parser";
import cors from 'cors';
import cookieParser from "cookie-parser";
const path = require('path')


const express = require('express')
const app = express()
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.render('index')
})

app.use(cors({
    credentials: true,
}))

app.use(compression()); // to make faster
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app)
const io = socketio.getio(server)

server.listen(PORT, ()=>{
    console.log("Server running on PORT " + PORT)
}) 


const MYSQL_HOST = process.env.HOST;
const MYSQL_USER = process.env.USER;
const MYSQL_PASS = process.env.PASS;

var con = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use('/', router())


