// here are the methods that are needed for common tasks

const connection = require('../config/db_connect_async');

class SharedService {
  async getUserIdByAuthtoken(authtoken) {
    /*
      returns user id if 
      -authtoken from req is equal to token from db for this user
    */
    const resultsId = await connection.execute('SELECT user_id FROM authtokens WHERE token = ?;', [authtoken]);
    const userId = resultsId[0][0];
    if (userId) {
      console.log('SharedService.getUserIdByAuthtoken: credentials', userId.user_id);
      return userId.user_id;
    }
    console.log('SharedService.getUserIdByAuthtoken: returning undefined');
    return;
  }
  async getUserType(userId) {
    const beekeepersResults = await connection.execute('SELECT * FROM beekeepers WHERE user_id = ?;', [userId]);
    const beekeeperData = beekeepersResults[0][0];

    if (beekeeperData) {
      return {
        userType: 'beekeeper',
        numOfHives: beekeeperData.num_of_hives,
      };
    }

    const farmersResults = await connection.execute('SELECT * FROM farmers WHERE user_id = ?;', [userId]);
    const farmerData = farmersResults[0][0];

    if (farmerData) {
      return {
        userType: 'farmer',
      };
    }

    return;
  }
}

module.exports = new SharedService();
