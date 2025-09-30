import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CatCelebration from '../components/CatCelebration';

const BattlePage = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [battleScenes, setBattleScenes] = useState([]);
  const [result, setResult] = useState(null);
  const [requiredThreshold, setRequiredThreshold] = useState(null);
  const [characterScores, setCharacterScores] = useState([]);
  const [averageScore, setAverageScore] = useState(null);
  
  const navigate = useNavigate();
const [sceneVictories, setSceneVictories] = useState([]);

 useEffect(() => {
  const fetchCharacters = async () => {
    const res = await axios.get('/api/characters');
    setAllCharacters(res.data);
  };

  const fetchScenes = async () => {
    const res = await axios.get('/api/scenes');
    const shuffled = res.data.sort(() => 0.5 - Math.random()).slice(0, 3);
    setBattleScenes(shuffled);
  };

  fetchCharacters();
  fetchScenes();
}, []);
const fetchScenes = async () => {
  const res = await axios.get('/api/scenes');
  const shuffled = res.data.sort(() => 0.5 - Math.random()).slice(0, 3);
  setBattleScenes(shuffled);
};

  const toggleCharacter = (id) => {
    setSelectedCharacters((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

const startBattle = async () => {
  try {
    const res = await axios.post('/api/battle/start', {
      characterIds: selectedCharacters,
      sceneIds: battleScenes.map((s) => s._id) // sahne ID’lerini gönder
    });
    setResult(res.data.result);
    setRequiredThreshold(res.data.requiredThreshold);
    setAverageScore(Math.round(res.data.average));
    setSceneVictories(res.data.sceneVictories);
  } catch (err) {
    console.error('Savaş başlatılamadı:', err);
  }
};


const resetBattle = () => {
  setSelectedCharacters([]);
  setBattleScenes([]);
  setResult(null);
  setSceneVictories([]);
  setCharacterScores([]);
  setAverageScore(null);
  fetchScenes(); // sahneleri yeniden çek
};

return (
    <Box sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
      {/* Sayfa başlığı */}
      <Typography variant="h4" sx={{ mb: 3, color: '#6a4c93', textAlign: 'center' }}>
        ⚔️ Kedicik Savaş Arenası
      </Typography>

      {/* Sürekli kutlama kediciği */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <CatCelebration />
      </Box>

      {/* Karakter seçimi ve sahne gösterimi */}
      {!result && (
        <>
          <Typography sx={{ mb: 2, fontSize: '1.1rem', color: '#6a4c93' }}>
            3 karakter seç ve kediciğin zaferi için savaşı başlat! 🐱🎯
          </Typography>

       <Box
  sx={{
    p: 3,
    backgroundColor: '#f3e8ff',
    borderRadius: 4,
    boxShadow: 2,
    mb: 4
  }}
>
  <Typography variant="h6" sx={{ mb: 2, color: '#6a4c93' }}>
    🎭 Karakterlerini Seç
  </Typography>

  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
    {allCharacters.map((char) => (
      <Button
        key={char._id}
        onClick={() => toggleCharacter(char._id)}
        variant={selectedCharacters.includes(char._id) ? 'contained' : 'outlined'}
        sx={{
          borderRadius: 3,
          backgroundColor: selectedCharacters.includes(char._id) ? '#ff80ab' : '#fff',
          color: '#6a4c93',
          fontWeight: 'bold',
          boxShadow: selectedCharacters.includes(char._id) ? 3 : 1,
          transition: '0.3s'
        }}
      >
        {char.avatar} {char.name}
      </Button>
    ))}
  </Box>
</Box>


          {battleScenes.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Karşılaşacağın Sahneler:
              </Typography>
              {battleScenes.map((scene) => (
                <Box
                  key={scene._id}
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor: scene.color || '#fce4ec',
                    borderRadius: 3,
                    boxShadow: 2,
                    borderLeft: '6px solid #ff80ab'
                  }}
                >
                  <Typography variant="h6">{scene.title} 🎬</Typography>
                  <Chip label={`Mood: ${scene.mood}`} color="secondary" sx={{ mt: 1 }} />
                </Box>
              ))}
            </Box>
          )}

          <Button
            variant="contained"
            disabled={selectedCharacters.length !== 3}
            onClick={startBattle}
            sx={{
              backgroundColor: '#ff80ab',
              borderRadius: 3,
              fontWeight: 'bold',
              textTransform: 'none',
              mt: 3
            }}
          >
            🚀 Savaşı Başlat
          </Button>
        </>
      )}

      {/* Savaş sonucu */}
      {result && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Seçilen Sahneler:
          </Typography>

          {battleScenes.map((scene) => (
            <Box
              key={scene._id}
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: scene.color || '#fce4ec',
                borderRadius: 3,
                boxShadow: 2,
                borderLeft: '6px solid #ff80ab'
              }}
            >
              <Typography variant="h6">{scene.title} 🎬</Typography>
              <Chip label={`Mood: ${scene.mood}`} color="secondary" sx={{ mt: 1 }} />
            </Box>
          ))}

          {/* Savaş Analizi */}
          <Box sx={{ mt: 4, p: 3, backgroundColor: '#fff0f6', borderRadius: 4, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>📊 Savaş Analizi</Typography>

            <Typography sx={{ mb: 1 }}>
              Gerekli uyum eşiği: <strong>%{requiredThreshold}</strong>
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Senin ortalama uyumun: <strong>%{averageScore}</strong>
            </Typography>

            {characterScores.map((char) => (
              <Typography key={char.name} sx={{ mb: 1 }}>
                {char.avatar} <strong>{char.name}</strong> → Uyum: <strong>%{char.score}</strong>
              </Typography>
            ))}
          </Box>

          {/* Sonuç mesajı */}
          {result === 'win' ? (
            <Typography
              variant="h5"
              sx={{ mt: 3, mb: 2, color: '#4caf50', textAlign: 'center' }}
            >
              🎉 Zafer senin! Kedicik gururla alkışlıyor!
            </Typography>
          ) : (
            <Typography
              variant="h5"
              sx={{ mt: 3, mb: 2, color: '#f44336', textAlign: 'center' }}
            >
              😿 Bu sefer olmadı... Kedicik seni teselli ediyor, bir dahaki sefere daha güçlü!
            </Typography>
          )}

          {/* Sahne başarıları */}
          {Array.isArray(sceneVictories) && sceneVictories.map((scene) => (
            <Box
              key={scene.sceneTitle}
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: scene.color || '#fce4ec',
                borderRadius: 3,
                boxShadow: 1,
                borderLeft: '4px solid #6a4c93'
              }}
            >
              <Typography variant="h6">{scene.sceneTitle} 🎬</Typography>
              <Typography>
                Bu sahneyi {scene.winner?.avatar} <strong>{scene.winner?.name}</strong> başarıyla geçti (%{scene.winner?.score})
              </Typography>
            </Box>
          ))}

          {/* Butonlar */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              variant="outlined"
              onClick={resetBattle}
              sx={{ borderRadius: 3, textTransform: 'none', color: '#6a4c93', borderColor: '#6a4c93' }}
            >
              🔁 Tekrar Deneyelim
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{
                backgroundColor: '#ffd6a5',
                borderRadius: 3,
                fontWeight: 'bold',
                textTransform: 'none',
                color: '#6a4c93'
              }}
            >
              🏠 Ana Sayfaya Dön
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BattlePage;
