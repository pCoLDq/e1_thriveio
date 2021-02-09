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
    response.send(404); // no suggestions found
    return;
  }

  async deleteSuggestion(request, response) {
    const { suggestionId } = request.query;

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

    const userId = SharedService.getUserIdByAuthtoken(authtoken);

    const suggestionData = BeekeepersSuggestionsService.selectSuggestionById(suggestionId);
    const tenderData = BeekeepersSuggestionsService.selectTenderById(suggestionData.tender_id);

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
    console.log('BeekeepersSuggestionsService.deleteSuggestion: authtoken', authtoken);

    if (!authtoken) {
      response.sendStatus(401); // unauthorized
      return;
    }

    const userId = SharedService.getUserIdByAuthtoken(authtoken);

    const suggestionData = BeekeepersSuggestionsService.selectSuggestionById(suggestionId);
    const tenderData = BeekeepersSuggestionsService.selectTenderById(suggestionData.tender_id);

    if (tenderData.farmer_id == userId) {
      await BeekeepersSuggestionsService.setBeekeeperWinnerForTender(tender.id, userId);
      await BeekeepersSuggestionsService.setNotRelevantStatusForTender(tender.id);
      await BeekeepersSuggestionsService.deleteSuggestion(suggestionId);
      response.sendStatus(200);
      return;
    }
  }
}

module.exports = new BeekeepersSuggestionsController();
