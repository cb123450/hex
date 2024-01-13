const express = require("express");
const router = express.Router()

let turn = "red";

router.get("/", (req, res) => {
    res.send(turn);
  })
  
router.put('/', (req, res) => {
    turn = req.body.turn;
    res.send(req.body)
})

module.exports = router