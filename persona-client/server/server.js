require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const characterRoutes = require('./routes/characterRoutes');
const emotionRoutes = require('./routes/emotionRoutes');
const sceneRoutes = require('./routes/sceneRoutes');
const battleRoutes = require('./routes/battle');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/battle', battleRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/emotions', emotionRoutes);
app.use('/api/scenes', sceneRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => console.error('MongoDB bağlantı hatası:', err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Sunucu ${process.env.PORT || 5000} portunda çalışıyor`);
});
