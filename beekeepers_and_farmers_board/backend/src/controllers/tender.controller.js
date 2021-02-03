const connection = require('../config/db_connect_async');
const TenderService = require('../services/tender.service');

class TenderController {
  async createTender(request, response) {
    const authtoken = request.cookies['AuthToken'];
    console.log("authcontroller.getUserData: request.cookies['AuthToken']", authtoken);
    if (!authtoken) {
      response.sendStatus(401); // unauthorized
      return;
    }

    const farmerIdIfUserIsFarmerFalseIfNot = await TenderService.getFarmerIdByAuthtoken(authtoken);
    if (!farmerIdIfUserIsFarmerFalseIfNot) {
      response.sendStatus(401); // user isnt farmer
      return;
    }

    const { requiredNumOfHives, salary } = request.body;
    if (!requiredNumOfHives || !salary || salary < 0 || requiredNumOfHives < 0) {
      response.sendStatus(400); //pseudo validation
      return;
    }

    const isCreated = await TenderService.insertTender(farmerIdIfUserIsFarmerFalseIfNot, requiredNumOfHives, salary);
    if (isCreated) {
      console.log('tender created');
      response.sendStatus(201); // tender created
      return;
    }
    response.sendStatus(501);
    return;
  }

  async getAllTenders(request, response) {
    const allTenders = await TenderService.selectAllTenders();
    if (allTenders[0]) {
      response.status(200).send(allTenders);
      return;
    }
    response.sendStatus(404); // no content
  }

  async updateTender(request, response) {
    const { id, status, requiredNumOfHives, beekeeperWinnerId, salary } = request.body;
    if (!id) {
      response.sendStatus(400); // bad request
      return;
    }

    const isCredentials = await TenderService.doesTheUserHaveTheRightsToTender(request);
    if (!isCredentials) {
      response.sendStatus(403); // user doesnt have rights to tender
      return;
    }

    if (status) {
      await TenderService.updateTenderStatus(id, status);
    }
    if (requiredNumOfHives) {
      await TenderService.updateTenderRequiredNumOfHives(id, requiredNumOfHives);
    }
    if (beekeeperWinnerId) {
      await TenderService.updateTenderBeekeeperWinnerId(id, beekeeperWinnerId);
    }
    if (salary) {
      await TenderService.updateTenderSalary(id, salary);
    }
    response.sendStatus(200);
  }

  async deleteTender(request, response) {
    const tenderId = request.body.id;
    console.log(request);
    if (!tenderId) {
      response.sendStatus(400); // bad request
      return;
    }

    const isCredentials = await TenderService.doesTheUserHaveTheRightsToTender(request);
    if (!isCredentials) {
      response.sendStatus(403); // user doesnt have rights to tender
      return;
    }

    await TenderService.deleteTender(tenderId);
    response.sendStatus(200);
    return;
  }
}

module.exports = new TenderController();
