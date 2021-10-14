const {Router} = require('express');

const usersRoutes = require('./Users');
const eventsRoutes = require('./Events');

const router = Router();

router.use('/users', usersRoutes);
router.use('/events', eventsRoutes)

module.exports = router;
