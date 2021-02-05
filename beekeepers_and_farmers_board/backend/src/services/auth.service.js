// const connection = require('../config/db_connect');
const connection = require('../config/db_connect_async');
const getHashedPassword = require('../service_functions/passwords_encoding');
const SharedService = require('../services/shared.service');

class AuthService {
  async insertUser(username, email, userType, password, numOfHives) {
    const hashedPassword = getHashedPassword(password);
    let status = false;

    await connection.execute('INSERT INTO `users` (`username`, `email`, `password`) VALUES (?, ?, ?);', [
      username,
      email,
      hashedPassword,
    ]); // registering user

    const userIdResults = await connection.execute('SELECT id FROM users WHERE username = ?;', [username]);
    const userId = userIdResults[0][0].id;

    if (userType == 'beekeeper') {
      await connection.execute('INSERT INTO `beekeepers` (`user_id`, `num_of_hives`) VALUES (?, ?);', [
        userId,
        numOfHives,
      ]); // registering beekeeper
    } else if (userType == 'farmer') {
      await connection.execute('INSERT INTO `farmers` (`user_id`) VALUES (?);', [userId]);
    } // registering farmer

    console.log('user registered:', username);
    status = true;

    return status;
  }

  async checkIfTheUsernameOrEmailIsTaken(username, email) {
    let status = true; // true if user with this name or email address is already registered, false if not

    const resultsUsers = await connection.execute('SELECT * FROM users WHERE username = ? OR email = ?;', [
      username,
      email,
    ]);
    const user = resultsUsers[0][0];
    console.log('authservice.checkIfTheUsernameOrEmailIsTaken: resultsUsers[0]', resultsUsers[0]);

    if (!user) {
      status = false; // that's alright, user with this name or email address isnt registered yet
    }

    return status;
  }

  async createOrUpdateAuthToken(authToken, userId) {
    console.log('authservuce.createOrUpdateAuthToken: authtoken', authToken);
    console.log('authservuce.createOrUpdateAuthToken: userId', userId);
    const authtokensResults = await connection.execute('SELECT * FROM authtokens WHERE user_id = ?;', [userId]);
    const potentialAuthtoken = authtokensResults[0][0];

    if (potentialAuthtoken) {
      await connection.execute('DELETE FROM authtokens WHERE user_id = ?', [userId]);
    } // deleting an existing authtoken

    await connection
      .execute('INSERT INTO `authtokens` (`token`, `user_id`) VALUES (?, ?)', [authToken, userId])
      .then(() => console.log(`token for ${userId} created`));
    return;
  }

  async authenticationUser(username, hashedPassword) {
    const resultsUsers = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ?;', [
      username,
      hashedPassword,
    ]);

    const user = resultsUsers[0][0];
    console.log('auth.service.authenticationUser: user', user);

    if (user != undefined) {
      console.log('credentials', user.id);
      return user.id; // tht's alright, the entered data is correct
    }
    return false; // not good, the password or username is incorrect, probably there's a ass hacking
  }
  async getUserDataByAuthToken(authtoken) {
    const resultsAuthtokens = await connection.execute('SELECT * FROM authtokens WHERE token = ?;', [authtoken]);
    const potentialAuthtoken = resultsAuthtokens[0][0];

    if (potentialAuthtoken) {
      const resultsUsers = await connection.execute('SELECT * FROM users WHERE id = ?;', [potentialAuthtoken.user_id]);
      const potentialUser = resultsUsers[0][0];
      const userTypeData = await SharedService.getUserType(potentialUser.id);

      if (potentialUser && userTypeData) {
        return Object.assign(
          {
            id: potentialUser.id,
            username: potentialUser.username,
            email: potentialUser.email,
          },
          userTypeData
        );
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  async deleteAuthToken(authtoken) {
    await connection.execute('DELETE FROM authtokens WHERE token = ?;', [authtoken]);
    return;
  }
}

module.exports = new AuthService();
