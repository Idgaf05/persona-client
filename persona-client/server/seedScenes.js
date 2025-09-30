const mongoose = require('mongoose');
const Scene = require('./models/Scene');
const generateSceneEmotions = require('./utils/generateSceneEmotions');

mongoose.connect('mongodb://localhost:27017/persona');

const rawScenes = [
  { title: 'Yalnız bir yürüyüş', mood: 'melancholic', color: '#cdb4db' },
  { title: 'Köpük dolu bir rüya', mood: 'playful', color: '#bde0fe' },
  { title: 'İçsel bir patlama', mood: 'intense', color: '#ffb4a2' },
  { title: 'Sisli bir orman', mood: 'tense', color: '#a2d2ff' },
  { title: 'Beklenmedik bir mektup', mood: 'mystery', color: '#ffc8dd' },
  { title: 'Sakin bir gün', mood: 'neutral', color: '#fdf6f8' }
];

const scenes = rawScenes.map((scene) => ({
  ...scene,
  emotions: generateSceneEmotions(scene.mood)
}));

async function seed() {
  await Scene.deleteMany({});
  await Scene.insertMany(scenes);
  console.log('🎭 Sahne verileri başarıyla eklendi!');
  mongoose.disconnect();
}

seed();
