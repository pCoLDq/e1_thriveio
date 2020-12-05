const AuthService = require('../services/auth.service');
const crypto = require('crypto');

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
};

export { getHashedPassword };

class AuthController {
  createUser(request, response) {
    const { username, password, confPassword } = request.body;
    if (password === confPassword) {
      let tryToRegister = AuthService.registerUser(username, password);
      if (tryToRegister) {
        response.render('login.hbs', {
          message: 'Registration Complete. Please login to continue.',
        });
        return;
      } else {
        response.render('register.hbs', {
          message: 'Username already registered',
        });
        return;
      }
    } else {
      response.render('register.hbs', {
        message: 'Passwords does not match.',
      });
      return;
    }
  }
  loginUser(request, response) {
    const { username, password } = request.body;
    const hashedPassword = getHashedPassword(password);

    connection.execute(
      'SELECT * FROM users WHERE username = ? AND password = ?;',
      [username, hashedPassword],
      (errUsers, resultsUsers, fieldsUsers) => {
        let user = resultsUsers[0];
        if (user != undefined) {
          const generateAuthToken = () => {
            return crypto.randomBytes(30).toString('hex');
          };
          const authToken = generateAuthToken();
          response.cookie('AuthToken', authToken);
          AuthService.createAuthToken(authToken, user.id);
          response.redirect('/');
        } else {
          response.render('login.hbs', {
            message: 'Invalid username or password',
          });
          return;
        }
      }
    );
  }
}

module.exports = new AuthController();
