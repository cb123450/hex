import express from 'express';
const socketio = require("./socketio.js");
import http from "http";
import mongoose from "mongoose";
import router from "router";

import compression from 'compression';
import bodyParser from "body-parser";
import cors from 'cors';
import cookieParser from "cookie-parser";


const express = require('express')
const app = express()
const PORT = 3000;


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

app.use('/', router())


const turnRoute = require('./routes/turn')
app.use('/turn', turnRoute)

const userRoute = require('./routes/user')
app.use('/user', userRoute)


