const { getUsers, putUser } = require("../db/connect.js")

const express = require("express");
const router = express.Router()

const users = []

router.get("/", getUsers);

router.put('/', putUser);

module.exports = router