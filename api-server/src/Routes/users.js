const express = require('express');

const { getUsers, getUserById } = require('../Controllers/UsersController');

const router = express.Router();

// trae todos los users
router.get('/', getUsers);

// trae todo el detalle del user
router.get('/:id', getUserById);

module.exports = router;