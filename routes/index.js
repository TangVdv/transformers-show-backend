const express = require('express');
const router = express.Router();

const showRoutes = require('./showRoutes');

router.use('/shows', showRoutes);

module.exports = router;