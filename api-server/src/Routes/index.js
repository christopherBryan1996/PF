const {Router} = require('express');

const usersRoutes = require('./users');
const eventsRoutes = require('./events');

const router = Router();

router.use('/users', usersRoutes);
router.use('/events', eventsRoutes);

module.exports = router;