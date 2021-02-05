const express = require('express'),
  router = express.Router(),
  BeekeepersSuggestionsController = require('../controllers/bkprs_suggestions.controller');

router.get('/get', BeekeepersSuggestionsController.getSuggestions);
router.post('/create', BeekeepersSuggestionsController.createSuggestion);
router.delete('/delete', BeekeepersSuggestionsController.deleteSuggestion);

module.exports = router;
