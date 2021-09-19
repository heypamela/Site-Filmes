const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/registrar.html', authController.registrar);



module.exports = router;