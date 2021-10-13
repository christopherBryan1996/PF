const express = require('express');
const { getUsers, register, login } = require('../Controllers/UsersController');
const router = express.Router();

// get all users
router.get('/', getUsers);

// create a user
router.post('/register', register);

// login
router.post('/login', login);

module.exports = router;