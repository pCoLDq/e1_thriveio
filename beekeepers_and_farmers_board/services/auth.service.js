import { connection } from '../app';
const crypto = require('crypto');

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
};

class AuthService {
  registerUser(username, password) {
    connection.execute('SELECT * FROM users WHERE username = ?;', [username], (errUsers, resultsUsers, fieldsUsers) => {
      if (resultsUsers[0] != undefined) {
        return false;
      }
      const hashedPassword = getHashedPassword(password);

      connection.execute(
        'INSERT INTO `users` (`username`, `password`) VALUES (?, ?)',
        [username, hashedPassword],
        (errUsers, resultsUsers, fieldsUsers) => {
          console.log('user registered');
        }
      );
      return true;
    });
  }
  createAuthToken(authToken, user_id) {
    connection.execute('INSERT INTO `authtokens` (`token`, `user_id`) VALUES (?, ?)', [authToken, user_id], () => {
      console.log('token created');
    });
  }
}

module.exports = new AuthService();
