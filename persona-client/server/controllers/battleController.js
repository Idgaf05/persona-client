const Character = require('../models/Character');
const Scene = require('../models/Scene');

const moodWeights = {
  playful:     { joy: 1.0, fear: -0.3 },
  tense:       { fear: 1.0, joy: -0.5 },
  melancholic: { sadness: 1.0, anger: -0.2 },
  intense:     { anger: 1.0, surprise: 0.5 },
  mystery:     { surprise: 1.0, fear: 0.3 },
  neutral:     { joy: 0.5, sadness: 0.5 }
};
function calculateCompatibility(characterEmotions, sceneMood) {
  const weights = moodWeights[sceneMood] || {};
  let score = 0;

  //  Null/undefined kontrolü yapıyorum
  if (!characterEmotions || typeof characterEmotions !== 'object') {
    return 0;
  }

  for (const emotion in weights) {
    score += (characterEmotions[emotion] || 0) * weights[emotion];
  }

  return Math.min(Math.max(Math.round(score), 0), 100);
}


exports.startBattle = async (req, res) => {
  try {
    const { characterIds, sceneIds } = req.body;

    //  Giriş doğrulama
    if (!Array.isArray(characterIds) || characterIds.length !== 3) {
      return res.status(400).json({ error: 'Tam olarak 3 karakter ID gönderilmelidir.' });
    }
    if (!Array.isArray(sceneIds) || sceneIds.length !== 3) {
      return res.status(400).json({ error: 'Tam olarak 3 sahne ID gönderilmelidir.' });
    }

    //  Verileri getir
    const characters = await Character.find({ _id: { $in: characterIds } });
    const selectedScenes = await Scene.find({ _id: { $in: sceneIds } });

    if (characters.length !== 3) {
      return res.status(404).json({ error: 'Karakterler bulunamadı veya eksik.' });
    }
    if (selectedScenes.length !== 3) {
      return res.status(404).json({ error: 'Sahneler bulunamadı veya eksik.' });
    }

    //  Uyum matrisini oluştur
    const compatibilityMatrix = characters.map((char) =>
      selectedScenes.map((scene) =>
        calculateCompatibility(char.emotions, scene.mood)
      )
    );

    //  Tüm karakter-sahne eşleşme kombinasyonlarını dene
    const permutations = [
      [0, 1, 2],
      [0, 2, 1],
      [1, 0, 2],
      [1, 2, 0],
      [2, 0, 1],
      [2, 1, 0]
    ];

    let bestTotal = -1;
    let bestAssignment = null;

    for (const perm of permutations) {
      const total = perm.reduce((sum, charIndex, sceneIndex) =>
        sum + compatibilityMatrix[charIndex][sceneIndex], 0
      );
      if (total > bestTotal) {
        bestTotal = total;
        bestAssignment = perm;
      }
    }

    // 5. En iyi eşleşmeyi sahne galibiyetlerine dönüştür
    const sceneVictories = selectedScenes.map((scene, i) => {
      const char = characters[bestAssignment[i]];
      const score = compatibilityMatrix[bestAssignment[i]][i];

      return {
        sceneTitle: scene.title,
        mood: scene.mood,
        winner: {
          name: char.name,
          avatar: char.avatar,
          score
        }
      };
    });

    // 6. Ortalama başarıyı hesapla
    const average = bestTotal / selectedScenes.length;
    const requiredThreshold = 50;
    const result = average >= requiredThreshold ? 'win' : 'lose';

    // 7. Loglama ve yanıt
    console.log('Sahne duyguları:', selectedScenes.map(s => ({
      title: s.title,
      mood: s.mood,
      emotions: s.emotions
    })));

    res.json({
      scenes: selectedScenes,
      result,
      average,
      requiredThreshold,
      sceneVictories
    });

  } catch (err) {
    console.error('Savaş başlatılamadı:', err);
    res.status(500).json({ error: 'Sunucu hatası: Savaş başlatılamadı.' });
  }
};
exports.calculateCompatibility = calculateCompatibility;
