/* 
    Rutas de Usuario / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { cretedUser, loginUser, renewToken } = require('../Controllers/auth');

const router = Router();

router.post('/new', cretedUser);  

router.post('/', loginUser)  

router.get('/renew', renewToken)  


module.exports = router;