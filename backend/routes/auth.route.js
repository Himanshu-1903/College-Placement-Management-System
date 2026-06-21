const express = require('express');
const router = express.Router();

const Signup = require('../controllers/auth/signup.controller.js');
const Login = require('../controllers/auth/login.controller.js');

router.post('/signup', Signup);
router.post('/login', Login);

module.exports = router;