let express = require('express');
let app = express();
let port = 3000;

// IMPORTS
let studenten = require('./Routes/Studenten');

// URLS
app.get('/', (req, res) => {
    res.send('Hello World');
    console.log('localhost:' + port);
})

app.use('/studenten', studenten);

// PORT
app.listen(port);