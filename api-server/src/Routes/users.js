const express = require('express');
const { getUsers } = require('../Controllers/UsersController');
const router = express.Router();

router.get('/', getUsers);

module.exports = router;