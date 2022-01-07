const express = require('express');
const router = express.Router()

const {schoolRegister} = require('../controllers/auth');

router.post('/register', schoolRegister);

module.exports = router;