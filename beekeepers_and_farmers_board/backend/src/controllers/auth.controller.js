const AuthService = require('../services/auth.service');
const getHashedPassword = require('../service_functions/passwords_encoding');
const generateAuthToken = require('../service_functions/generate_authtoken');

class AuthController {
  async createUser(request, response) {
    const { username, email, userType, numOfHives, password, confPassword } = request.body;
    const isTaken = await AuthService.isTheUsernameOrEmailTaken(username, email);
    console.log('isTaken:', isTaken);
    if (isTaken) {
      response.sendStatus(409); // user with the same username or email is already registered
      return;
    }
    if (password === confPassword) {
      const isRegistered = await AuthService.insertUser(username, email, userType, password, numOfHives);
      if (isRegistered) {
        response.sendStatus(201); // user successfully registered
      } else {
        response.sendStatus(501); // server err
      }
      return;
    } else {
      console.log('passwords doesnt match');
      response.sendStatus(400); // passwords dont match
      return;
    }
  }
  async loginUser(request, response) {
    const { username, password } = request.body;
    const hashedPassword = getHashedPassword(password);

    const userId = await AuthService.authenticationUser(username, hashedPassword);
    console.log('authcontroller.loginUser: user', userId);
    if (userId) {
      const authToken = generateAuthToken();
      response.cookie('AuthToken', authToken, {
        httpOnly: true,
        sameSite: true,
      });
      await AuthService.createOrUpdateAuthToken(authToken, userId);
      console.log('successful authentication');
      response.sendStatus(200); // successful authentication
      return;
    } else {
      response.sendStatus(403); // invalid username or password
      return;
    }
  }
  async getUserData(request, response) {
    const authtoken = request.cookies['AuthToken'];
    console.log("authcontroller.getUserData: request.cookies['AuthToken']", authtoken);
    if (!authtoken) {
      response.sendStatus(404);
      return;
    }
    const userData = await AuthService.getUserDataByAuthToken(authtoken);
    if (userData) {
      response.status(200).send(userData);
      return;
    } else {
      response.sendStatus(404); // Not found: token or user doesnt exists
      return;
    }
  }
  async logoutUser(request, response) {
    const authtoken = request.cookies['AuthToken'];
    console.log('authcontroller.logoutUser: authtoken', authtoken);
    if (authtoken) {
      await AuthService.deleteAuthToken(authtoken);
      response.clearCookie('AuthToken');
      response.sendStatus(200);
      return;
    } else {
      response.sendStatus(404);
      return;
    }
  }
}

module.exports = new AuthController();
