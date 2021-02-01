const express = require('express');
const router = express.Router();
const AuthRoutes = require('./auth.routes');
const TenderRouter = require('./tender.routes');

router.use('/auth', AuthRoutes);
router.use('/tenders', TenderRouter);

module.exports = router;
