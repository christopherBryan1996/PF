const {Router} = require('express');

const usersRoutes = require('./users');
const eventsRoutes = require('./events');

const router = Router();

router.use('/api/users', usersRoutes);
router.use('/events', eventsRoutes);
router.use('/api/auth', require('./auth'));


module.exports = router