const mongoose = require('mongoose');

const eventLogSchema = new mongoose.Schema({
  characterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Character' },
  event: String,
  emotions: {
    anger: Number,
    joy: Number,
    fear: Number,
    sadness: Number,
    surprise: Number
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EventLog', eventLogSchema);
