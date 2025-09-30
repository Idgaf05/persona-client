import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import { Link } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';



const CharacterDashboard = ({ characterId }) => {
  const [character, setCharacter] = useState(null);
  const [emotions, setEmotions] = useState(null);
const [lastSimulatedScene, setLastSimulatedScene] = useState('');

  const [allScenes, setAllScenes] = useState([]);
  const [selectedScene, setSelectedScene] = useState('');
const [compatibility, setCompatibility] = useState(null);

  useEffect(() => {
    const fetchScenes = async () => {
      const res = await axios.get('/api/scenes');
      setAllScenes(res.data);
    };
    fetchScenes();
  }, []);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await fetch(`/api/characters/${characterId}`);
        const data = await res.json();
        setCharacter(data);
        setEmotions(data.emotions);
      } catch (err) {
        console.error('Karakter alınamadı:', err);
      }
    };
    fetchCharacter();
  }, [characterId]);

  const goToFavorites = async () => {
  try {
    await axios.post('/api/scenes/auto-favorite', { characterId });
    window.location.href = `/favorites/${characterId}`;
  } catch (err) {
    console.error("Oto-favori atanamadı:", err);
  }
};

 const simulateScene = async () => {
  try {
    const selected = allScenes.find((s) => s.title === selectedScene);
    if (!selected) return;

    const res = await axios.post('/api/scenes/simulateTrainer', {
      characterId,
      scene: selected.title
    });
setLastSimulatedScene(selected.title); //  sahne adını kaydet
setSelectedScene(''); // sahne seçimini sıfırla

    const updatedEmotions = res.data.emotions;
    if (updatedEmotions) {
      setEmotions(updatedEmotions); 
    }
    setCompatibility(res.data.compatibility);

    setSelectedScene('');
  } catch (err) {
    console.error('Simülasyon hatası:', err);
  }
};

  if (!character || !emotions) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 10 }}>
        <CircularProgress />
        <Typography>Kedicik karakterini getiriyor... 🐱</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Merhaba {character.name}! 🎉
      </Typography>
      
 <Link to={`/scenes/${characterId}`} style={{ textDecoration: 'none' }}>
  <Button
    variant="outlined"
    color="secondary"
    sx={{ mt: 2, borderRadius: 3 }}
  >
    🎬 Tüm Sahne Listesi
  </Button>
</Link>
     <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mt: 4,
    mb: 3,
    flexWrap: 'wrap'
  }}
>
  <FormControl sx={{ minWidth: 240 }}>
    <InputLabel id="scene-select-label">Sahne Seç ✨</InputLabel>
    <Select
      labelId="scene-select-label"
      value={selectedScene}
      label="Sahne Seç ✨"
      onChange={(e) => setSelectedScene(e.target.value)}
    >
      {allScenes.map((scene) => (
        <MenuItem key={scene._id || scene.title} value={scene.title}>
          {scene.title}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  <Button
    variant="contained"
    disabled={!selectedScene}
    onClick={simulateScene}
    sx={{
      backgroundColor: '#ff80ab',
      borderRadius: 3,
      height: '56px' // Select ile hizalanması için
    }}
  >
    Simüle Et 🎬
  </Button>
</Box>


{compatibility !== null && lastSimulatedScene && (
  <Box sx={{ mt: 4,mb : 5,  p: 3, backgroundColor: '#fff0f6', borderRadius: 4, boxShadow: 3 }}>
    <Typography variant="h6">🎯 Uyum Analizi</Typography>

    <Typography>
      <strong>{lastSimulatedScene}</strong> sahnesi için karakterin uyum oranı: <strong>%{compatibility}</strong>
    </Typography>

    <Typography sx={{ mt: 1 }}>
      Hazırlık seviyesi:{' '}
      <Chip
        label={
          compatibility > 70
            ? 'Yüksek'
            : compatibility > 40
            ? 'Orta'
            : 'Düşük'
        }
        color={
          compatibility > 70
            ? 'success'
            : compatibility > 40
            ? 'warning'
            : 'error'
        }
        sx={{ ml: 1 }}
      />
    </Typography>

    <Typography sx={{ mt: 2 }}>
  {compatibility > 70
    ? `✨ Karakter ${lastSimulatedScene} sahnesine çok uygun.`
    : compatibility > 40
    ? `🤔 Karakter ${lastSimulatedScene} sahnesine kısmen hazır.`
    : `😿 Karakterin ${lastSimulatedScene} sahnesine girmesi riskli olabilir.`}
</Typography>

  </Box>
)}


      <CharacterCard character={{ ...character, emotions }} />
     <Link to="/battle" style={{ textDecoration: 'none' }}>
  <Button
    variant="contained"
    sx={{
      mt: 3,
      px: 3,
      py: 1.5,
      borderRadius: 4,
      boxShadow: 3,
      fontWeight: 'bold',
      fontSize: '1rem',
      backgroundColor: '#ff80ab',
      color: '#fff',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#ff5c8a',
        boxShadow: 4
      }
    }}
  >
    ⚔️ Savaş Zamanı
  </Button>
</Link>


     <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    gap: 2,
    flexWrap: 'wrap',
    mt: 5
  }}
>
  <Link to={`/favorites/${characterId}`} style={{ textDecoration: 'none' }}>
    <Button
      variant="contained"
      sx={{
        px: 3,
        py: 1.5,
        borderRadius: 4,
        boxShadow: 3,
        fontWeight: 'bold',
        fontSize: '1rem',
        backgroundColor: '#ffc8dd',
        color: '#6a4c93',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#ffb4d4',
          boxShadow: 4
        }
      }}
      onClick={goToFavorites}
    >
      ⭐ Duygusal Evini Gör
    </Button>
  </Link>

  <Link to="/create" style={{ textDecoration: 'none' }}>
    <Button
      variant="contained"
      sx={{
        px: 3,
        py: 1.5,
        borderRadius: 4,
        boxShadow: 3,
        fontWeight: 'bold',
        fontSize: '1rem',
        backgroundColor: '#bde0fe',
        color: '#6a4c93',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#a2d2ff',
          boxShadow: 4
        }
      }}
    >
      ✨ Yeni Karakter Oluştur
    </Button>
  </Link>

  <Link to="/" style={{ textDecoration: 'none' }}>
    <Button
      variant="contained"
      sx={{
        px: 3,
        py: 1.5,
        borderRadius: 4,
        boxShadow: 3,
        fontWeight: 'bold',
        fontSize: '1rem',
        backgroundColor: '#ffdac1',
        color: '#6a4c93',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#ffe4d6',
          boxShadow: 4
        }
      }}
    >
      🧑‍🎨 Tüm Karakterleri Gör
    </Button>
  </Link>
</Box>

    </Box>
  );
};

export default CharacterDashboard;
