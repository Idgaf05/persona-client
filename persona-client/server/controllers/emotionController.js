exports.simulateEmotion = async (req, res) => {
  const { event } = req.body;

  if (!event || typeof event !== 'string') {
    return res.status(400).json({ error: 'Geçerli bir event metni gönderilmelidir.' });
  }

  const emotionMap = {
    sadness: ['taşınıyor', 'kaybetti', 'yalnız', 'üzüldü', 'ağladı'],
    joy: ['kutlama', 'hediye', 'başardı', 'sevindi', 'gülümsedi'],
    anger: ['kavga', 'haksızlık', 'bağırdı', 'sinirlendi', 'öfke'],
    surprise: ['beklenmedik', 'aniden', 'şok', 'şaşırdı', 'sürpriz'],
    fear: ['karanlık', 'kayboldu', 'tehdit', 'korktu', 'endişe']
  };

  const result = {
    anger: 0,
    joy: 0,
    fear: 0,
    sadness: 0,
    surprise: 0
  };

  const normalizedEvent = event.toLowerCase();

  for (const [emotion, keywords] of Object.entries(emotionMap)) {
    for (const word of keywords) {
      if (normalizedEvent.includes(word)) {
        result[emotion] += 25;
      }
    }
  }

  // Duygu yoğunluğunu 100 ile sınırla
  Object.keys(result).forEach((key) => {
    result[key] = Math.min(result[key], 100);
  });

  return res.status(200).json({ emotions: result });
};
