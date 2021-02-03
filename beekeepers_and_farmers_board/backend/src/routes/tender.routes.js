const express = require('express'),
  router = express.Router(),
  TenderController = require('../controllers/tender.controller');

router.get('/get_all', TenderController.getAllTenders);
router.post('/create', TenderController.createTender);
router.patch('/update', TenderController.updateTender);
router.post('/delete', TenderController.deleteTender);

module.exports = router;
