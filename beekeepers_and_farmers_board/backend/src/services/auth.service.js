// const connection = require('../config/db_connect');
const connection = require('../config/db_connect_async');
const getHashedPassword = require('../service_functions/passwords_encoding');

class AuthService {
  async registerUser(username, email, password) {
    const hashedPassword = getHashedPassword(password);
    let status = false;

    await connection
      .execute('INSERT INTO `users` (`username`, `email`, `password`) VALUES (?, ?, ?)', [
        username,
        email,
        hashedPassword,
      ])
      .then(() => {
        console.log('user registered:', username);
        status = true;
      });
    return status;
  }

  async checkIfTheUsernameOrEmailIsTaken(username, email) {
    let status = true; // пользователь с таким именем или почтой уже зарегестрирован

    const resultsUsers = await connection.execute('SELECT * FROM users WHERE username = ? OR email = ?;', [
      username,
      email,
    ]);

    console.log('authservice.checkIfTheUsernameOrEmailIsTaken: resultsUsers[0]', resultsUsers[0]);
    if (resultsUsers[0] != []) {
      status = false; // всё збс
    }
    return status;
  }

  async createAuthToken(authToken, user_id) {
    await connection
      .execute('INSERT INTO `authtokens` (`token`, `user_id`) VALUES (?, ?)', [authToken, user_id])
      .then(() => console.log(`token for ${user_id} created`));
    return;
  }

  async authenticationUser(username, hashedPassword) {
    const resultsUsers = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ?;', [
      username,
      hashedPassword,
    ]);

    const user = resultsUsers[0][0];
    console.log('auth.service.authenticationUser: user', user);

    if (user.username != undefined) {
      console.log('credentials', user.id);
      return user; // всё збс, введённые данные верны
    }
    return false; // не збс, пароль или username неверны, возможно идёт взлом жопы
  }
}

module.exports = new AuthService();
