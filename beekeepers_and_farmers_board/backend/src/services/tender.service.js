const connection = require('../config/db_connect_async');

class TenderService {
  async insertTender(farmerId, requiredNumOfHives, salary) {
    await connection.execute(
      'INSERT INTO `tenders` (`farmer_id`, `required_num_of_hives`, `salary`) VALUES (?, ?, ?);',
      [farmerId, requiredNumOfHives, salary]
    ); // add new tender to db
    return true;
  }

  async getUserIdByAuthtoken(authtoken) {
    /*
    returns user id if 
    -authtoken from req is equal to token from db for this user
    */
    const resultsId = await connection.execute('SELECT user_id FROM authtokens WHERE token = ?;', [authtoken]);
    const userIdIfCredentialsUndefinedIfNot = resultsId[0][0];
    if (userIdIfCredentialsUndefinedIfNot) {
      console.log('TenderService.getUserIdByAuthtoken: credentials', userIdIfCredentialsUndefinedIfNot.user_id);
      return userIdIfCredentialsUndefinedIfNot.user_id;
    }
    console.log('TenderService.getUserIdByAuthtoken: returning false');
    return false;
  }

  async getFarmerIdByAuthtoken(authtoken) {
    /*
    returns user/farmer id if 
    -authtoken from req is equal to token from db for this user
    -user is farmer
    */
    const userIdIfCredentialsFalseIfNot = await this.getUserIdByAuthtoken(authtoken);
    if (userIdIfCredentialsFalseIfNot) {
      const farmersResults = await connection.execute('SELECT * FROM farmers WHERE user_id = ?', [
        userIdIfCredentialsFalseIfNot,
      ]);
      const farmerIfUserIsFarmerUndefinedIfNot = farmersResults[0][0];
      if (farmerIfUserIsFarmerUndefinedIfNot) {
        // if user is farmer
        console.log('TenderService.getFarmerIdByAuthtoken: user is farmer');
        return userIdIfCredentialsFalseIfNot; // returning farmer id
      }
    }
    console.log('TenderService.getFarmerIdByAuthtoken: returning false at 37s');
    return false;
  }

  async selectAllTenders() {
    const resultsTenders = await connection.execute('SELECT * FROM tenders;'); // TODO: add pagination
    const listOfTenders = resultsTenders[0];
    for (let tender of listOfTenders) {
      const resultsUsers = await connection.execute('SELECT username FROM users WHERE id = ?', [tender.farmer_id]);
      tender.farmerUsername = resultsUsers[0][0].username;
    }
    return listOfTenders;
  }

  async checkIfTheTenderBelongsToFarmer(authtoken, tenderId) {
    /*
    returns true if 
    -authtoken from req is equal to token from db for this user
    -user is farmer
    -user owns the tender
    */
    const farmerIdIfUserIsFarmerFalseIfNot = await this.getFarmerIdByAuthtoken(authtoken);

    if (!farmerIdIfUserIsFarmerFalseIfNot) {
      console.log('TenderService.checkIfTheTenderBelongsToFarmer: returning false at 51s');
      return false; // user isnt farmer
    }

    const resultsTenders = await connection.execute('SELECT farmer_id FROM tenders WHERE id = ?', [tenderId]);
    const farmerTenderOwnerIdIfTheTenderExistsUndefinedIfNot = resultsTenders[0][0];

    if (!farmerTenderOwnerIdIfTheTenderExistsUndefinedIfNot) {
      // if tender doesnt exist
      console.log('TenderService.checkIfTheTenderBelongsToFarmer: returning false at 59s');
      return false;
    }

    if (farmerTenderOwnerIdIfTheTenderExistsUndefinedIfNot.farmer_id == farmerIdIfUserIsFarmerFalseIfNot) {
      // if farmer in req really owns the tender
      console.log('TenderService.checkIfTheTenderBelongsToFarmer: returning true at 65s');
      return true;
    }
    console.log('TenderService.checkIfTheTenderBelongsToFarmer: returning false at 68s');
    return false;
  }

  async doesTheUserHaveTheRightsToTender(request) {
    const tenderId = request.body.id || request.query.id;
    const authtoken = request.cookies['AuthToken'];
    console.log("TenderService.doesTheUserHaveTheRightsToTender: request.cookies['AuthToken']", authtoken);
    if (!authtoken) {
      console.log('TenderService.doesTheUserHaveTheRightsToTender: returning false at 77s');
      return false; // unauthorized
    } else {
      const isFarmerOwnsTheTender = await this.checkIfTheTenderBelongsToFarmer(authtoken, tenderId);
      if (isFarmerOwnsTheTender) {
        console.log('TenderService.doesTheUserHaveTheRightsToTender: returning true at 81s');
        return true; // forbidden: the farmer doesnt own the tender
      }
    }
    console.log('TenderService.doesTheUserHaveTheRightsToTender: returning false at 85s');
    return false;
  }

  async updateTenderStatus(tenderId, newStatus) {
    await connection.execute('UPDATE tenders SET status = ? WHERE id = ?', [newStatus, tenderId]);
    console.log('tender with id', tenderId, 'updated status to', newStatus);
    return;
  }
  async updateTenderRequiredNumOfHives(tenderId, newRequiredNumOfHives) {
    await connection.execute('UPDATE tenders SET required_num_of_hives = ? WHERE id = ?', [
      newRequiredNumOfHives,
      tenderId,
    ]);
    console.log('tender with id', tenderId, 'updated required_num_of_hives to', newRequiredNumOfHives);
    return;
  }
  async updateTenderBeekeeperWinnerId(tenderId, newBeekeeperWinnerId) {
    await connection.execute('UPDATE tenders SET beekeeper_winner_id = ? WHERE id = ?', [
      newBeekeeperWinnerId,
      tenderId,
    ]);
    console.log('tender with id', tenderId, 'updated beekeeper_winner_id to', newBeekeeperWinnerId);
    return;
  }
  async updateTenderSalary(tenderId, newSalary) {
    await connection.execute('UPDATE tenders SET salary = ? WHERE id = ?', [newSalary, tenderId]);
    console.log('tender with id', tenderId, 'updated salary to', newSalary);
    return;
  }

  async deleteTender(tenderId) {
    await connection.execute('DELETE FROM tenders WHERE id = ?;', [tenderId]);
    return;
  }
}

module.exports = new TenderService();
