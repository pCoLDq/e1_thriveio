const express = require('express');
const router = express.Router();
const AuthRoutes = require('./auth.routes');

router.post('/auth', AuthRoutes);

router.get('/', (request, response) => {
  response.render('main.hbs', {
    isAuthenticated: request.isAuthenticated,
    username: request.user.username,
  });
});

module.exports = router;
