const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: String,
  age: Number,
  background: String,
  avatar: String,
  personality: {
    openness: Number,
    conscientiousness: Number,
    extraversion: Number,
    agreeableness: Number,
    neuroticism: Number
  },
  emotions: {
    anger: Number,
    joy: Number,
    fear: Number,
    sadness: Number,
    surprise: Number
  }
});

module.exports = mongoose.model('Character', characterSchema);
