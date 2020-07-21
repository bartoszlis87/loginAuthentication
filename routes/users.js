const express = require('express');
const router = express.Router();

//Route Login
router.get('/login', (req, res) => res.send('Welcome Login'));

//Register
router.get('/register', (req, res) => res.send('Welcome Register Login'));

module.exports = router;