const BeekeepersSuggestionsService = require('../services/bkprs_suggestions.service');
const SharedService = require('../services/shared.service');

class BeekeepersSuggestionsController {
  async createSuggestion(request, response) {
    const { tenderId } = request.body;
    if (!tenderId) {
      response.sendStatus(400); // bad request
      return;
    }

    const authtoken = request.cookies['AuthToken'];
    console.log('BeekeepersSuggestionsService.createSuggestion: authtoken', authtoken);
    if (!authtoken) {
      response.sendStatus(401); // unauthorized
      return;
    }

    const beekeeperData = await BeekeepersSuggestionsService.getBeekeeperDataByAuthToken(authtoken);
    if (!beekeeperData) {
      response.sendStatus(403); // forbidden: user isnt beekeeper or token doesnt exists
      return;
    }

    const tenderData = await BeekeepersSuggestionsService.selectTenderById(tenderId);

    if (beekeeperData.numOfHives < tenderData.required_num_of_hives) {
      response.sendStatus(403); // beekeeper doesnt have enough num of hives
      return;
    }

    const isSuggestionAlreadyExists = await BeekeepersSuggestionsService.isSuggestionExistsForTenderAndBeekeeper(
      tenderId,
      beekeeperData.beekeeperId
    );

    if (isSuggestionAlreadyExists) {
      response.sendStatus(409); // suggestion already exists
      return;
    }

    await BeekeepersSuggestionsService.insertSuggestion(tenderId, beekeeperData.beekeeperId);

    console.log('suggestion created');
    response.sendStatus(201);
    return;
  }

  async getSuggestions(request, response) {
    const authtoken = request.cookies['AuthToken'];
    console.log('BeekeepersSuggestionsService.createSuggestion: authtoken', authtoken);

    if (!authtoken) {
      response.sendStatus(401); // unauthorized
      return;
    }

    const userId = await SharedService.getUserIdByAuthtoken(authtoken);
    if (!userId) {
      response.sendStatus(401); // token doesnt exists
      return;
    }

    const suggestions = await BeekeepersSuggestionsService.selectSuggestionsByUserId(userId);

    if (suggestions) {
      response.status(200).send(suggestions);
      return;
    }
    response.sendStatus(404); // no suggestions found
    return;
  }

  async deleteSuggestion(request, response) {
    const suggestionId = request.query.id;
    console.log(suggestionId);
    if (!suggestionId) {
      response.sendStatus(400); // bad request
      return;
    }

    const authtoken = request.cookies['AuthToken'];
    console.log('BeekeepersSuggestionsService.deleteSuggestion: authtoken', authtoken);

    if (!authtoken) {
      response.sendStatus(401); // unauthorized
      return;
    }

    const beekeeperData = await BeekeepersSuggestionsService.getBeekeeperDataByAuthToken(authtoken);

    if (!beekeeperData) {
      response.sendStatus(403); // forbidden: token doesnt exists
      return;
    }

    const suggestion = await BeekeepersSuggestionsService.getSuggestionById(suggestionId);
    if (!suggestion) {
      response.sendStatus(400); // if suggestion doesnt exist
      return;
    }

    const permission = await BeekeepersSuggestionsService.isBeekeeperTheOwnerOfSuggestion(
      beekeeperData.beekeeperId,
      suggestionId
    );

    if (permission) {
      await BeekeepersSuggestionsService.deleteSuggestion(suggestionId);
      response.sendStatus(200);
      return;
    }
    response.sendStatus(501);
    return;
  }
  async denyBeekeeperSuggestion(request, response) {
    const { suggestionId } = request.body;

    if (!suggestionId) {
      response.sendStatus(400); // bad request
      return;
    }

    const authtoken = request.cookies['AuthToken'];
    console.log('BeekeepersSuggestionsService.deleteSuggestion: authtoken', authtoken);

    if (!authtoken) {
      response.sendStatus(401); // unauthorized
      return;
    }

    const userId = await SharedService.getUserIdByAuthtoken(authtoken);

    const suggestionData = await BeekeepersSuggestionsService.selectSuggestionById(suggestionId);
    const tenderData = await BeekeepersSuggestionsService.selectTenderById(suggestionData.tender_id);

    if (tenderData.farmer_id == userId) {
      await BeekeepersSuggestionsService.setDeniedStatus(suggestionId);
      response.sendStatus(200);
      return;
    }
    response.sendStatus(403); // user doesnt owns the tender
    return;
  }

  async admitBeekeeperSuggesion(request, response) {
    const { suggestionId } = request.body;

    if (!suggestionId) {
      response.sendStatus(400); // bad request
      return;
    }

    const authtoken = request.cookies['AuthToken'];
    console.log('BeekeepersSuggestionsService.admitSuggestion: authtoken', authtoken);

    if (!authtoken) {
      response.sendStatus(401); // unauthorized
      return;
    }

    const userId = await SharedService.getUserIdByAuthtoken(authtoken);
    const suggestionData = await BeekeepersSuggestionsService.selectSuggestionById(suggestionId);
    const tenderData = await BeekeepersSuggestionsService.selectTenderById(suggestionData.tender_id);

    const isDenied = await BeekeepersSuggestionsService.isThereDeniedSuggestions(tenderData.id, userId);
    if (isDenied) {
      response.sendStatus(403);
      return;
    }
    console.log(userId, suggestionData, tenderData);
    if (tenderData.farmer_id == userId) {
      await BeekeepersSuggestionsService.setBeekeeperWinnerForTender(tenderData.id, suggestionData.beekeeper_id);
      await BeekeepersSuggestionsService.setNotRelevantStatusForTender(tenderData.id);
      await BeekeepersSuggestionsService.setAdmitedStatusForSuggestion(suggestionId);

      response.sendStatus(200);
      return;
    }
    response.sendStatus(501);
    return;
  }

  async getFarmerIdByTenderId(request, response) {
    const { tenderId } = request.query;

    if (!tenderId) {
      response.sendStatus(400); // bad request
      return;
    }

    const authtoken = request.cookies['AuthToken'];
    console.log('BeekeepersSuggestionsConroller.getFarmerIdByTenderId: authtoken', authtoken);

    if (!authtoken) {
      response.sendStatus(401); // unauthorized
      return;
    }

    const userId = await SharedService.getUserIdByAuthtoken(authtoken);
    const tenderData = await BeekeepersSuggestionsService.selectTenderById(tenderId);

    if (userId == tenderData.beekeeper_winner_id) {
      const email = await BeekeepersSuggestionsService.selectFarmerEmailById(tenderData.farmer_id);
      if (email) {
        response.status(200).send(email);
        return;
      }
      response.sendStatus(404);
      return;
    }
    response.sendStatus(501);
    return;
  }
}

module.exports = new BeekeepersSuggestionsController();
