const express = require('express'),
  router = express.Router(),
  BeekeepersSuggestionsController = require('../controllers/bkprs_suggestions.controller');

router.get('/get', BeekeepersSuggestionsController.getSuggestions);
router.get('/get_farmers_email_by_tender_id', BeekeepersSuggestionsController.getFarmerIdByTenderId);
router.post('/create', BeekeepersSuggestionsController.createSuggestion);
router.delete('/delete', BeekeepersSuggestionsController.deleteSuggestion);
router.patch('/admit', BeekeepersSuggestionsController.admitBeekeeperSuggesion);
router.patch('/deny', BeekeepersSuggestionsController.denyBeekeeperSuggestion);

module.exports = router;
