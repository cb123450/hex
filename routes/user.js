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

router.get("/", (req, res) => {
    //get all users
    connection.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ', err);
            res.status(500).send({error : 'Internal Server Error'});
            return;
        }
        res.status(200).send(result);
    });
  });

//check if user has already registered with this email
router.put('/', (req, res) => {
    const _nickname = req.body.nickname;
    const _email = req.body.email;
    // console.log(nickname);
    // console.log(email);
    //INSERT INTO users (nickname, email, created_at) VALUES ('JohnDoe', 'john@example.com', NOW());
    
    connection.query(    
        'SELECT * FROM users WHERE email = ?',
        [_email],
        (selectErr, selectRes) => {
            if (selectErr){
                console.error("Error executing SELECT query on server: ", selectErr);
                res.status(500).send({error: 'Internal Server Error'});
                return;
            }

            if (selectRes.length > 0){
                //email already has an account
                res.status(409).send({error: 'User with this email already exists'});
            } else {
                //email does not exist, insert new row into `users` table
                connection.query(
                    'INSERT INTO users (nickname, email, created_at) VALUES (?, ?, NOW())',
                    [_nickname, _email],
                    (err, results)=>{
                        if (err){
                            console.error("Error executing INSERT query on server: ", err);
                            res.status(500).send({error: 'Internal Server Error'});
                            return;
                        }
                        res.status(200).send({nickname: _nickname, email: _email});
                    }
                );  
            }
        }
    )
})

module.exports = router