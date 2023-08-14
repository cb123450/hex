const express = require("express");
const router = express.Router()

const users = []

router.get("/", (req, res) => {
    res.status(200).send(users);
  })
  
router.put('/', (req, res) => {
    
    let user = {
        name: req.body.name,
    };

    if (!(users.some(obj => obj.name === req.body.name))){
        users.push(user)
        res.status(200)
    }
    else{
        res.status(409)
        //Send a status 409 if user is already logged in
    }
    res.send(req.body)
    
})

module.exports = router