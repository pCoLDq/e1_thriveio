// here are the methods that are needed for common tasks

const connection = require('../config/db_connect_async');

class SharedService {
  async getUserIdByAuthtoken(authtoken) {
    /*
      returns user id if 
      -authtoken from req is equal to token from db for this user
    */
    const resultsId = await connection.execute('SELECT user_id FROM authtokens WHERE token = ?;', [authtoken]);
    const userIdIfCredentialsUndefinedIfNot = resultsId[0][0];
    if (userIdIfCredentialsUndefinedIfNot) {
      console.log('SharedService.getUserIdByAuthtoken: credentials', userIdIfCredentialsUndefinedIfNot.user_id);
      return userIdIfCredentialsUndefinedIfNot.user_id;
    }
    console.log('SharedService.getUserIdByAuthtoken: returning false');
    return false;
  }
  async getUserType(userId) {
    const beekeepersResults = await connection.execute('SELECT * FROM beekeepers WHERE user_id = ?;', [userId]);
    const potentialBeekeeper = beekeepersResults[0][0];

    if (potentialBeekeeper) {
      return {
        userType: 'beekeeper',
        numOfHives: potentialBeekeeper.num_of_hives,
      };
    }

    const farmersResults = await connection.execute('SELECT * FROM farmers WHERE user_id = ?;', [userId]);
    const potentialFarmer = farmersResults[0][0];

    if (potentialFarmer) {
      return {
        userType: 'farmer',
      };
    }

    return false;
  }
}

module.exports = new SharedService();
