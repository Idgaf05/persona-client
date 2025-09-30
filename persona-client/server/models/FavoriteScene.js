const mongoose = require('mongoose');

const favoriteSceneSchema = new mongoose.Schema({
  characterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Character' },
  title: String,
  mood: String,
  color: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FavoriteScene', favoriteSceneSchema);
