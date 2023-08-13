const express = require("express");
const router = express.Router()

let turn;

router.get("/", (req, res) => {
    //console.log("get: " + turn)
    res.send(turn);
  })
  
router.put('/', (req, res) => {
    turn = req.body.turn;
    //console.log("post: " + turn)
    res.send(req.body)
})

module.exports = router