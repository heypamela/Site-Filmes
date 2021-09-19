const express = require('express');


const router = express.Router();

router.get('/', (req, res) =>{
    res.render('index.html');
});

router.get('/registrar.html', (req, res) =>{
    res.render('registrar.html');
})

module.exports = router;