const express = require('express');
const router = express.Router();
const AuthRoutes = require('./auth.routes');
const TenderRouter = require('./tender.routes');
const BeekeepersSuggestionsRouter = require('./bkprs_suggestions.routes');

router.use('/auth', AuthRoutes);
router.use('/tenders', TenderRouter);
router.use('/beekeepers_suggestions', BeekeepersSuggestionsRouter);

module.exports = router;
