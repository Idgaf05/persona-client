function generateSceneEmotions(mood) {
  const moodMap = {
    playful:     { joy: 90, fear: 10, sadness: 5, anger: 0, surprise: 30 },
    tense:       { fear: 85, joy: 15, sadness: 20, anger: 40, surprise: 10 },
    melancholic: { sadness: 90, anger: 30, joy: 10, fear: 20, surprise: 5 },
    intense:     { anger: 90, surprise: 60, fear: 40, sadness: 20, joy: 5 },
    mystery:     { surprise: 90, fear: 40, sadness: 20, anger: 10, joy: 30 },
    neutral:     { joy: 50, sadness: 50, anger: 50, fear: 50, surprise: 50 }
  };

  const base = { anger: 0, joy: 0, fear: 0, sadness: 0, surprise: 0 };
  const weights = moodMap[mood] || {};

  for (const key in weights) {
    base[key] = weights[key];
  }

  return base;
}

module.exports = generateSceneEmotions;
