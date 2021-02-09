const express = require('express'),
  router = express.Router(),
  BeekeepersSuggestionsController = require('../controllers/bkprs_suggestions.controller');

router.get('/get', BeekeepersSuggestionsController.getSuggestions);
router.post('/create', BeekeepersSuggestionsController.createSuggestion);
router.delete('/delete', BeekeepersSuggestionsController.deleteSuggestion);
router.patch('/admit', BeekeepersSuggestionsController.admitBeekeeperSuggesion);
router.patch('/deny', BeekeepersSuggestionsController.denyBeekeeperSuggestion);

module.exports = router;
