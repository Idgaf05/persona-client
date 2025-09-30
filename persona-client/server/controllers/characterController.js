const Character = require('../models/Character');

exports.getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (err) {
    console.error('Karakterler alınamadı:', err);
    res.status(500).json({ error: 'Karakterler alınamadı' });
  }
};
exports.updateCharacter = async (req, res) => {
  try {
    const updated = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Karakter güncellenemedi:', err);
    res.status(500).json({ error: 'Karakter güncellenemedi' });
  }
};
exports.deleteCharacter = async (req, res) => {
  try {
    await Character.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error('Karakter silinemedi:', err);
    res.status(500).json({ error: 'Karakter silinemedi' });
  }
};


exports.getCharacter = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) return res.status(404).json({ error: 'Karakter bulunamadı' });
    res.json(character);
  } catch (err) {
    console.error('Karakter alınırken hata:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

exports.createCharacter = async (req, res) => {
  try {
    const newCharacter = await Character.create(req.body);
    res.status(201).json(newCharacter);
  } catch (err) {
    console.error('Karakter oluşturulamadı:', err);
    res.status(500).json({ error: 'Karakter oluşturulamadı' });
  }
};
