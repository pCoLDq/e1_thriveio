const connection = require('../config/db_connect_async');
const SharedService = require('./shared.service');

class TenderService {
  async insertTender(farmerId, requiredNumOfHives, salary) {
    await connection.execute(
      'INSERT INTO `tenders` (`farmer_id`, `required_num_of_hives`, `salary`) VALUES (?, ?, ?);',
      [farmerId, requiredNumOfHives, salary]
    ); // add new tender to db
    return;
  }

  async getFarmerIdByAuthtoken(authtoken) {
    /*
    returns user/farmer id if 
    -authtoken from req is equal to token from db for this user
    -user is farmer
    */
    const userId = await SharedService.getUserIdByAuthtoken(authtoken);
    if (userId) {
      const farmerResults = await connection.execute('SELECT * FROM farmers WHERE user_id = ?', [userId]);
      const farmerData = farmerResults[0][0];
      if (farmerData) {
        // if user is farmer
        console.log('TenderService.getFarmerIdByAuthtoken: user is farmer');
        return userId; // returning farmer id
      }
    }
    console.log('TenderService.getFarmerIdByAuthtoken: returning false at 37s');
    return;
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

  async isFarmerOwnsTheTender(authtoken, tenderId) {
    /*
    returns true if 
    -authtoken from req is equal to token from db for this user
    -user is farmer
    -user owns the tender
    */
    const farmerId = await this.getFarmerIdByAuthtoken(authtoken);

    if (!farmerId) {
      console.log('TenderService.isFarmerOwnsTheTender: returning false at 51s');
      return false; // user isnt farmer
    }

    const resultsTenders = await connection.execute('SELECT farmer_id FROM tenders WHERE id = ?', [tenderId]);
    const tenderOwnerId = resultsTenders[0][0];

    if (!tenderOwnerId) {
      // if tender doesnt exist
      console.log('TenderService.isFarmerOwnsTheTender: returning false at 59s');
      return false;
    }

    if (tenderOwnerId.farmer_id == farmerId) {
      // if farmer in req really owns the tender
      console.log('TenderService.isFarmerOwnsTheTender: returning true at 65s');
      return true;
    }
    console.log('TenderService.isFarmerOwnsTheTender: returning false at 68s');
    return false;
  }

  async isTheUserOwnerOfTender(request) {
    const tenderId = request.body.id || request.query.id;
    const authtoken = request.cookies['AuthToken'];
    console.log("TenderService.isTheUserOwnerOfTender: request.cookies['AuthToken']", authtoken);
    if (!authtoken) {
      console.log('TenderService.isTheUserOwnerOfTender: returning false at 77s');
      return false; // unauthorized
    } else {
      const isFarmerOwnsTheTender = await this.isFarmerOwnsTheTender(authtoken, tenderId);
      if (isFarmerOwnsTheTender) {
        console.log('TenderService.isTheUserOwnerOfTender: returning true at 81s');
        return true; // forbidden: the farmer doesnt own the tender
      }
    }
    console.log('TenderService.isTheUserOwnerOfTender: returning false at 85s');
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
