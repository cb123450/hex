const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function createConnection() {
    const connection = await pool.getConnection();
    return { connection, release: () => connection.release() };
}

async function getUsers(req, res) {
    let db;
    try {
        db = await createConnection();
        const result = await queryAsync(db.connection, 'SELECT * FROM users');
        res.status(200).send(result);
    } catch (error) {
        console.error('Error in getUsers:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    } finally {
        if (db) db.release();
    }
}

async function putUser(req, res) {
    let db;
    try {
        db = await createConnection();
        const _nickname = req.body.nickname;
        const _email = req.body.email;

        console.log(_email, _nickname);

        const selectRes = await queryAsync(db.connection, 'SELECT * FROM users WHERE email = ?', [_email]);
        console.log("SelectRes: ", selectRes);

        if (selectRes.length > 0) {
            res.status(409).send({ error: 'User with this email already exists' });
        } else {
            const insertResult = await queryAsync(
                db.connection,
                'INSERT INTO users (nickname, email, created_at) VALUES (?, ?, NOW())',
                [_nickname, _email]
            );
            res.status(200).send({ nickname: _nickname, email: _email });
        }
    } catch (error) {
        console.error('Error in putUser:', error);
        res.status(500).send({ error: 'Internal Sever Error' });
    } finally {
        if (db) db.release();
    }
}

async function queryAsync(connection, sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
}

module.exports = {
    getUsers,
    putUser
};

