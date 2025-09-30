const express = require('express');
const router = express.Router();
const { simulateEmotion } = require('../controllers/emotionController');

router.post('/simulate', simulateEmotion);

module.exports = router;
