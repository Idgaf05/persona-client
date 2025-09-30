const mongoose = require('mongoose');

const SceneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mood: { type: String },
  color: { type: String },
  story: { type: String },
  resonatesWith: [{ type: String }],
  emotions: {
    joy: { type: Number, default: 0 },
    sadness: { type: Number, default: 0 },
    anger: { type: Number, default: 0 },
    fear: { type: Number, default: 0 },
    surprise: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Scene', SceneSchema);
