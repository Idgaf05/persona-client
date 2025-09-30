const express = require('express');
const router = express.Router();
const {
  getAllScenes,
  suggestScenes,
  simulateTrainer,
  applySceneToCharacter,
  assignAutoFavorite,
  markFavorite,
  getFavorites,
  deleteFavorite,
  updateFavorite
} = require('../controllers/sceneController');

router.get('/', getAllScenes);
router.post('/suggest', suggestScenes);

router.post('/simulateTrainer', simulateTrainer);
router.post('/apply', applySceneToCharacter);
router.post('/auto-favorite', assignAutoFavorite);
router.post('/favorite', markFavorite);
router.get('/favorite/:characterId', getFavorites);
router.delete('/favorite/:id', deleteFavorite);
router.put('/favorite/:id', updateFavorite);

module.exports = router;
