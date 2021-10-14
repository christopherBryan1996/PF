const express = require('express');

const { getUsers } = require('../Controllers/UsersController');

const router = express.Router();

// get all users
router.get('/', getUsers);


module.exports = router;