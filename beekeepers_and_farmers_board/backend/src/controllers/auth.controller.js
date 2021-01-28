const AuthService = require('../services/auth.service');
const getHashedPassword = require('../service_functions/passwords_encoding');
const generateAuthToken = require('../service_functions/generate_authtoken');

class AuthController {
  async createUser(request, response) {
    const { username, email, userType, numOfHives, password, confPassword } = request.body;
    const isTaken = await AuthService.checkIfTheUsernameOrEmailIsTaken(username, email);
    console.log('isTaken:', isTaken);
    if (password === confPassword && !isTaken) {
      const signup = await AuthService.registerUser(username, email, userType, password, numOfHives);
      if (signup) {
        response.sendStatus(201); // user successfully registered
      } else {
        response.sendStatus(501); // server err
      }
      return;
    } else {
      console.log('passwords doesnt match');
      response.sendStatus(400); // passwords dont match or the user with the same username or email is already registered
      return;
    }
  }
  async loginUser(request, response) {
    const { username, password } = request.body;
    const hashedPassword = getHashedPassword(password);

    const user = await AuthService.authenticationUser(username, hashedPassword);
    console.log('authcontroller.loginUser: user', user);
    if (user) {
      const authToken = generateAuthToken();
      response.cookie('AuthToken', authToken);
      await AuthService.createOrUpdateAuthToken(authToken, user.id);

      response.status(202).send(user); // successful authentication
      return;
    } else {
      response.sendStatus(403); // invalid username or password
      return;
    }
  }
}

module.exports = new AuthController();
