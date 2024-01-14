const { getUsers, putUser } = require("../db/connect.js")

const express = require("express");
const router = express.Router()

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


const users = []

router.get("/", getUsers);

router.put('/', putUser);

module.exports = router