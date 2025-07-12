const express = require('express');
const { saveHistory, getCoinHistory } = require('../controllers/historyController');

const router = express.Router();

router.post('/', saveHistory);
router.get('/:coinId', getCoinHistory);

module.exports = router;
