const AuthService = require('../services/auth.service');
const getHashedPassword = require('../service_functions/passwords_encoding');
const generateAuthToken = require('../service_functions/generate_authtoken');

class AuthController {
  async createUser(request, response) {
    const { username, email, password, confPassword } = request.body;
    const isTaken = await AuthService.checkIfTheUsernameOrEmailIsTaken(username, email);
    console.log(isTaken);
    if (password === confPassword && !isTaken) {
      const signup = await AuthService.registerUser(username, email, password);
      if (signup) {
        response.sendStatus(201); // пользователь успешно зарегестрировался
      } else {
        response.sendStatus(501); // server err
      }
      return;
    } else {
      response.sendStatus(400); // пароли не совпадают или пользователь с таким username или email уже зарегестрирован
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
      await AuthService.createAuthToken(authToken, user.id);
      response.status(202).send({
        username: user.username,
        email: user.email,
      }); // аутентификация прошла успешно
      return;
    } else {
      response.sendStatus(403); // неправильное имя пользователя или пароль
      return;
    }
  }
}

module.exports = new AuthController();
