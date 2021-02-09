const connection = require('../config/db_connect_async');
const SharedService = require('./shared.service');

class BeekeepersSuggestionsService {
  async insertSuggestion(tenderId, beekeeperId) {
    await connection.execute('INSERT INTO `bkprs_suggestions` (`tender_id`, `beekeeper_id`) VALUES (?, ?);', [
      tenderId,
      beekeeperId,
    ]); // add new tender to db
    return;
  }

  async selectTenderById(tenderId) {
    const resultsTenders = await connection.execute('SELECT * FROM tenders WHERE id = ?;', [tenderId]);
    const tender = resultsTenders[0][0];
    return tender;
  }

  async selectSuggestionById(suggestionId) {
    const resultsSuggestions = await connection.execute('SELECT * FROM bkprs_suggestions WHERE id = ?;', [
      suggestionId,
    ]);
    const suggestion = resultsSuggestions[0][0];
    return suggestion;
  }

  async isSuggestionExistsForTenderAndBeekeeper(tenderId, beekeeperId) {
    const resultsSuggestions = await connection.execute(
      'SELECT * FROM bkprs_suggestions WHERE tender_id = ? AND beekeeper_id = ?',
      [tenderId, beekeeperId]
    );

    if (!resultsSuggestions[0][0]) {
      return false;
    }
    return true;
  }

  async getBeekeeperDataByAuthToken(authtoken) {
    /*
    returns user/beekeepers id if 
    -authtoken from req is equal to token from db for this user
    -user is beekeeper
    */
    const userId = await SharedService.getUserIdByAuthtoken(authtoken);
    if (userId) {
      const beekeepersResults = await connection.execute('SELECT * FROM beekeepers WHERE user_id = ?', [userId]);
      const beekeeperData = beekeepersResults[0][0];
      if (beekeeperData) {
        // if user is beekeeper
        console.log('BeekeepersSuggestionsService.getBeekeeperIdByAuthtoken: user is beekeeper');
        return {
          beekeeperId: userId,
          numOfHives: beekeeperData.num_of_hives,
        }; // returning beekeeper id
      }
    }
    console.log('BeekeepersSuggestionsService.getBeekeeperIdByAuthtoken: returning false at 50s');
    return null;
  }

  async selectSuggestionsByUserId(userId) {
    let userType = await SharedService.getUserType(userId);
    userType = userType.userType; // dont pay attention :)

    if (userType == 'beekeeper') {
      const suggestionsResults = await connection.execute('SELECT * FROM bkprs_suggestions WHERE beekeeper_id = ?', [
        userId,
      ]);
      const suggestionsList = suggestionsResults[0];
      console.log(
        'BeekeepersSuggestionsService.selectSuggestionsByUserId: suggestionsList for beekeeper:',
        suggestionsList
      );

      if (suggestionsList[0]) {
        return suggestionsList;
      } else {
        return null; // no content
      }
    } else if (userType == 'farmer') {
      const tenderIdResults = await connection.execute('SELECT id FROM tenders WHERE farmer_id = ?', [userId]);
      let suggestionsList = [];
      for (let tenderIdResult of tenderIdResults[0]) {
        const tenderId = tenderIdResult.id;
        const suggestionsResults = await connection.execute('SELECT * FROM bkprs_suggestions WHERE tender_id = ?', [
          tenderId,
        ]);
        if (suggestionsResults[0][0]) {
          suggestionsList.push(suggestionsResults[0][0]);
        }
      }
      console.log(
        'BeekeepersSuggestionsService.selectSuggestionsByUserId: suggestionList for farmer:',
        suggestionsList
      );
      if (suggestionsList) {
        return suggestionsList;
      }
    }
    return;
  }

  async getSuggestionById(suggestionId) {
    const resultsSuggestions = await connection.execute('SELECT * FROM bkprs_suggestions WHERE id = ?', [suggestionId]);
    const suggestion = resultsSuggestions[0][0];
    return suggestion;
  }

  async isBeekeeperTheOwnerOfSuggestion(beekeeperId, suggestionId) {
    const resultsSuggestions = await connection.execute('SELECT beekeeper_id FROM bkprs_suggestions WHERE id = ?', [
      suggestionId,
    ]);
    const suggestion = resultsSuggestions[0][0];
    if (suggestion.beekeeper_id == beekeeperId) {
      return true;
    }
    return false;
  }

  async deleteSuggestion(suggestionId) {
    await connection.execute('DELETE FROM bkprs_suggestions WHERE id = ?;', [suggestionId]);
    return;
  }

  async setDeniedStatus(suggestionId) {
    await connection.execute('UPDATE bkprs_suggestions SET status = ? WHERE id = ?', ['denied', suggestionId]);
    return;
  }

  async setBeekeeperWinnerForTender(tenderId, userId) {
    await connection.execute('UPDATE tenders SET beekeeper_winner_id = ? WHERE id = ?', [userId, tenderId]);
  }

  async setNotRelevantStatusForTender(tenderId) {
    await connection.execute('UPDATE tenders SET status = `not_relevant` WHERE id = ?', [tenderId]);
  }
}

module.exports = new BeekeepersSuggestionsService();
