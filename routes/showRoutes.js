const express = require('express');
const router = express.Router();
const showController = require('../controllers/showController');

router.get('/', showController.getShows);
router.get('/:id', showController.getSpecificShow)

module.exports = router;