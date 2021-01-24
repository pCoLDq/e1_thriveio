const express = require('express');
const router = express.Router();
const AuthRoutes = require('./auth.routes');

router.post('/auth', AuthRoutes);

router.get('/', (request, response) => {
  // sending data
  // response.render('main.hbs', {
  //   isAuthenticated: request.isAuthenticated,
  //   username: request.user.username,
  // });
});

module.exports = router;
