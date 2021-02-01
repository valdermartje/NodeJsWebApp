// VARIABLES
const { Router } = require('express');

let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.send('GET || Toon alle studenten');
});

router.get('/:id', (req, res) => {
    res.send('GET || Toon student ' + req.params.id)
});

router.get('/:id/:name', (req, res) => {
    res.send('GET || Toon student ' + req.params.id + ' met ' + req.params.name + ' als naam')
});

router.post('/', (req, res) => {
    res.send('POST || In studenten')
});

// EXPORT THESE ROUTER 
module.exports = router;