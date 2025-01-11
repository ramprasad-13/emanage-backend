const express = require('express');
const router = express.Router();


//User Routes
const register = require('./controller/Auth/register');
const login = require('./controller/Auth/login');

router.post('/auth/register',register);
router.post('/auth/login',login);

module.exports = router;