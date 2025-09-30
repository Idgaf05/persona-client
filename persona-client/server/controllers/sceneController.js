const FavoriteScene = require('../models/FavoriteScene');
const Character = require('../models/Character');
const Scene = require('../models/Scene');
exports.suggestScenes = async (req, res) => {
  const { emotions } = req.body;

  if (!emotions || typeof emotions !== 'object') {
    return res.status(400).json({ error: 'Emotions verisi gereklidir.' });
  }

  let suggestions = [];

  if (emotions.sadness > 50) {
    suggestions.push({ title: 'Yalnız bir yürüyüş', mood: 'melancholic', color: '#cdb4db' });
  }
  if (emotions.joy > 50) {
    suggestions.push({ title: 'Köpük dolu bir rüya', mood: 'playful', color: '#bde0fe' });
  }
  if (emotions.anger > 50) {
    suggestions.push({ title: 'İçsel bir patlama', mood: 'intense', color: '#ffb4a2' });
  }
  if (emotions.fear > 50) {
    suggestions.push({ title: 'Sisli bir orman', mood: 'tense', color: '#a2d2ff' });
  }
  if (emotions.surprise > 50) {
    suggestions.push({ title: 'Beklenmedik bir mektup', mood: 'mystery', color: '#ffc8dd' });
  }

  if (suggestions.length === 0) {
    suggestions.push({ title: 'Sakin bir gün', mood: 'neutral', color: '#fdf6f8' });
  }

  //  (_id ekle)
  suggestions = suggestions.map((s, i) => ({
    _id: `suggestion-${i}`,
    ...s
  }));

  res.status(200).json({ scenes: suggestions });
};

exports.simulateTrainer = async (req, res) => {
  const { characterId, scene } = req.body;

  const character = await Character.findById(characterId);
  const selectedScene = await Scene.findOne({ title: scene });

  //  Uyum oranı hesapla
  const moodWeights = {
    playful: { joy: 1.0, fear: -0.3 },
    tense: { fear: 1.0, joy: -0.5 },
    melancholic: { sadness: 1.0, anger: -0.2 },
    intense: { anger: 1.0, surprise: 0.5 },
    mystery: { surprise: 1.0, fear: 0.3 },
    neutral: { joy: 0.5, sadness: 0.5 }
  };
if (!character || !selectedScene) return res.status(404).json({ error: 'Veri eksik' });

  const weights = moodWeights[selectedScene.mood] || {};
  let score = 0;
  for (const emotion in weights) {
    score += (character.emotions[emotion] || 0) * weights[emotion];
  }
  const compatibility = Math.min(Math.max(Math.round(score), 0), 100);

  //  En baskın 2 duyguyu bul
  const topEmotions = Object.entries(character.emotions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([emotion]) => emotion);

  //  Bu duygularla uyumlu sahneleri öner
  const suggestedScenes = await Scene.find({
    mood: { $in: topEmotions }
  }).limit(2);
if (suggestedScenes.length === 0) {
  suggestedScenes.push({
    _id: 'fallback-1',
    title: 'Sakin bir gün',
    mood: 'neutral',
    color: '#fdf6f8'
  });
}

  res.json({
    compatibility,
    suggestedScenes,
    emotions: character.emotions 
  });
  
};


exports.applySceneToCharacter = async (req, res) => {
  try {
    const { characterId, sceneId } = req.body;

    const character = await Character.findById(characterId);
    const scene = await Scene.findById(sceneId);

    if (!character || !scene) {
      return res.status(404).json({ error: 'Character veya Scene bulunamadı' });
    }

    // sahnenin duygusal etkilerini karakterin mevcut değerlerine ekle
    Object.keys(scene.emotions).forEach(emotion => {
      character.emotions[emotion] =
        (character.emotions[emotion] || 0) + (scene.emotions[emotion] || 0);
    });

    await character.save();

    res.json(character);
  } catch (err) {
    console.error('Sahne uygulanamadı:', err);
    res.status(500).json({ error: 'Sahne uygulanamadı' });
  }
};

exports.assignAutoFavorite = async (req, res) => {
  const { characterId } = req.body;
  if (!characterId) return res.status(400).json({ error: 'characterId gerekli' });

  try {
    // karakteri çek
    const Character = require('../models/Character');
    const char = await Character.findById(characterId);
    if (!char) return res.status(404).json({ error: 'Karakter bulunamadı' });

    // dominant emotionu bul
    const dominantEmotion = Object.entries(char.emotions).sort((a, b) => b[1] - a[1])[0][0];

    // bu emotiona uygun sahne önerileri al
    let suggestions = [];
    if (dominantEmotion === 'joy') suggestions.push({ title: 'Köpük dolu bir rüya', mood: 'playful', color: '#bde0fe' });
    if (dominantEmotion === 'sadness') suggestions.push({ title: 'Yalnız bir yürüyüş', mood: 'melancholic', color: '#cdb4db' });
    if (dominantEmotion === 'anger') suggestions.push({ title: 'İçsel bir patlama', mood: 'intense', color: '#ffb4a2' });
    if (dominantEmotion === 'fear') suggestions.push({ title: 'Sisli bir orman', mood: 'tense', color: '#a2d2ff' });
    if (dominantEmotion === 'surprise') suggestions.push({ title: 'Beklenmedik bir mektup', mood: 'mystery', color: '#ffc8dd' });

    // fallback
    if (suggestions.length === 0) suggestions.push({ title: 'Sakin bir gün', mood: 'neutral', color: '#fdf6f8' });

    const scene = suggestions[0];

    // DB’ye kaydet
    const fav = await FavoriteScene.create({
      characterId,
      title: scene.title,
      mood: scene.mood,
      color: scene.color,
      isHome: true
    });

    res.status(201).json(fav);
  } catch (err) {
    console.error('Oto-favori atanamadı:', err);
    res.status(500).json({ error: 'Oto-favori atanamadı' });
  }
};

exports.getAllScenes = async (req, res) => {
  const { characterId } = req.query;

  const scenes = await Scene.find();
  if (!characterId) return res.json(scenes);

  const character = await Character.findById(characterId);
  if (!character) return res.status(404).json({ error: 'Karakter bulunamadı' });

  const moodWeights = {
    playful:     { joy: 1.0, fear: -0.3 },
    tense:       { fear: 1.0, joy: -0.5 },
    melancholic: { sadness: 1.0, anger: -0.2 },
    intense:     { anger: 1.0, surprise: 0.5 },
    mystery:     { surprise: 1.0, fear: 0.3 },
    neutral:     { joy: 0.5, sadness: 0.5 }
  };

  const enrichedScenes = scenes.map((scene) => {
    const weights = moodWeights[scene.mood] || {};
    let score = 0;
    for (const emotion in weights) {
      score += (character.emotions[emotion] || 0) * weights[emotion];
    }
    const compatibility = Math.min(Math.max(Math.round(score), 0), 100);
    return { ...scene.toObject(), compatibility, weights };
  });

  res.json(enrichedScenes);
};

exports.markFavorite = async (req, res) => {
  const { characterId, scene } = req.body;

  if (!characterId || !scene?.title) {
    return res.status(400).json({ error: 'Eksik veri' });
  }

  const saved = await FavoriteScene.create({
    characterId,
    title: scene.title,
    mood: scene.mood,
    color: scene.color
  });

  res.status(201).json(saved);
};
exports.deleteFavorite = async (req, res) => {
  try {
    await FavoriteScene.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Favori sahne silinemedi' });
  }
};
exports.updateFavorite = async (req, res) => {
  try {
    const updated = await FavoriteScene.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Favori sahne güncellenemedi' });
  }
};

exports.getFavorites = async (req, res) => {
  const { characterId } = req.params;
  const favorites = await FavoriteScene.find({ characterId }).sort({ timestamp: -1 });
  res.json(favorites);
};
