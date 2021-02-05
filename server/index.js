let express = require('express');
let app = express();
let mysql = require('mysql');
let cors = require('cors');

let port = process.env.port || 3000; //export PORT=3000

// CONNECTION OBJECT
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'valdemar_api'
})

// MAKE CONNECTION TO DATABASE
connection.connect((error) => {
    if (error) {
        console.error(error);
    }
});

// USES 
app.use(express.json()); // USE MIDDELWARE JSON
// app.use(cors);


// ROUTES

app.get('/api/', (req, res) => {
    res.json('Doesnt have data');
})


// WORKING SELECT ALL REQUEST
app.get('/api/users', (req, res) => {
    connection.query("SELECT * FROM users", function (err, result, fields) {
        if (err) {
            console.log(err.sqlMessage);
            res.status(404).json(err.sqlMessage);
        } else {
            res.send(result);
        }
    });
})


// WORKING SELECT ONE REQUEST
app.get('/api/user/:id/', (req, res) => {
    const id = req.params.id;

    connection.query(`SELECT * FROM users WHERE id=${id}`, (err, result, fields) => {
        if (err) {
            console.log(err.sqlMessage);
            res.status(404).json(err.sqlMessage);
        } else {
            res.send(result);
        }
    });
})

// WORKING INSERT REQUEST
app.post('/api/user', (req, res) => {
    const data = [req.body.username, req.body.first_name, req.body.last_name, req.body.email];
    const queryInsert = `INSERT INTO users(username, first_name, last_name, email) VALUES (?, ?, ?, ?)`;

    connection.query(queryInsert, data, function (err, result, fields) {
        // if (err) {
        //     res.send(err.sqlMessage);
        // }

        res.send(dbQuery);
    });
})

// TODO: UPDATE REQUEST
app.put('/api/user/:id', (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const queryUpdate = `UPDATE users SET username=${data.username} WHERE id=${id}`;

    connection.query(queryUpdate, data, (err, result, fields) => {

    })

    res.send(data);
})


// WORKING DELETE REQUEST
app.delete('/api/user/:id', (req, res) => {
    const queryDelete = `DELETE FROM users WHERE id=${req.params.id}`

    connection.query(queryDelete, (err, result, fields) => {
        if (err) {
            console.log(err.sqlMessage);
            res.status(404).json(err.sqlMessage);
        } else {
            console.log('DELETED USER ' + req.params.id);
            res.send(result);

            // if (result.affectedRows == 0) {
            //     res.send('USER DOESNT EXIST');
            // } else {
            //     res.send('USER ACCOUNT SUCCESFULLY DELETED');
            // }
        }
    })
})


// PORT
app.listen(port, () => {
    console.log(`Listening on port http://localhost: ${port}`);
});