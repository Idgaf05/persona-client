const express = require('express');
const router = express.Router();
const { startBattle } = require('../controllers/battleController');

router.post('/start', startBattle);

module.exports = router;
