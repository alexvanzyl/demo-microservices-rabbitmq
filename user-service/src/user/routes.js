const router = require('express').Router();
const usersController = require('./controller');

router.post('/register', usersController.register);

module.exports = router;
