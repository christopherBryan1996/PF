const {Router} = require('express');

const usersRoutes = require('./users');
// const eventsRoutes = require('./Events');

const router = Router();

router.use('/users', usersRoutes);

router.use('/api/auth', require('./auth'));


module.exports = router;