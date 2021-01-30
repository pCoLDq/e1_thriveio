const express = require('express'),
  router = express.Router(),
  AuthController = require('../controllers/auth.controller');

router.post('/register', AuthController.createUser);
router.post('/login', AuthController.loginUser);
router.post('/logout', AuthController.logoutUser);
router.get('/user_data', AuthController.getUserData);

module.exports = router;
