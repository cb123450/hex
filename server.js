const express = require('express')
var path = require('path')

const app = express()

app.use(express.static("public"));

app.set("view engine", "ejs")

app.listen(3000)
