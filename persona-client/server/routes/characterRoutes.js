const express = require('express');
const router = express.Router();
const {
  getCharacter,
  createCharacter,
  getAllCharacters,
  updateCharacter,
  deleteCharacter
} = require('../controllers/characterController');

router.get('/', getAllCharacters);
router.get('/:id', getCharacter);
router.post('/', createCharacter);
router.put('/:id', updateCharacter);      // Düzenleme
router.delete('/:id', deleteCharacter);   // Silme

module.exports = router;
