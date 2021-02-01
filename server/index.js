let express = require('express');
let app = express();
let port = 3000;
let mysql = require('mysql');

// IMPORTS
const studenten = require('./Routes/Studenten');

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

// ROUTES
app.get('/api/', (req, res) => {
    res.json('Doesnt have data');
})

app.get('/api/users', (req, res) => {
    connection.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/api/user/:id', (req, res) => {
    try {
        throw connection.query(`SELECT * FROM users WHERE id=${req.params.id}`, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    }
    catch (error) {
        console.warn(error);
    }
})

app.post('/api/user', (req, res) => {
    console.log(req.params);
    res.json(req.body);
})

// app.get('/studenten', studenten);

// PORT
app.listen(port);