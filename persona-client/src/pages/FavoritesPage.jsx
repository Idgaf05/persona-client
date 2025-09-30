import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Button
} from '@mui/material';

const FavoritesPage = () => {
  const { characterId } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [emotions, setEmotions] = useState(null);
  const [homeSceneId, setHomeSceneId] = useState(null);
  const [homeSceneTitle, setHomeSceneTitle] = useState('');
  const [characterName, setCharacterName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const charRes = await axios.get(`/api/characters/${characterId}`);
        setEmotions(charRes.data.emotions);
        setCharacterName(charRes.data.name);

        const favRes = await axios.get(`/api/scenes/favorite/${characterId}`);

        const uniqueFavorites = [];
        const seenTitles = new Set();
        favRes.data.forEach((scene) => {
          if (!seenTitles.has(scene.title)) {
            uniqueFavorites.push(scene);
            seenTitles.add(scene.title);
          }
        });

        setFavorites(uniqueFavorites);

        const dominantEmotion = Object.entries(charRes.data.emotions)
          .sort((a, b) => b[1] - a[1])[0][0];

        const getSceneDominantEmotion = (scene) =>
          scene.emotions
            ? Object.entries(scene.emotions).sort((a, b) => b[1] - a[1])[0][0]
            : null;

        const home = uniqueFavorites.find(
          (scene) => getSceneDominantEmotion(scene) === dominantEmotion
        );

        if (home) {
          setHomeSceneId(home._id);
          setHomeSceneTitle(home.title);
        } else if (uniqueFavorites.length > 0) {
          setHomeSceneTitle(uniqueFavorites[0].title);
        }
      } catch (err) {
        console.error('Favoriler alınamadı:', err);
      }
    };

    fetchData();
  }, [characterId]);

  if (!favorites || !emotions) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress />
        <Typography>Favori sahneler yükleniyor... 🐾</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #bde0fe 0%, #ffc8dd 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        overflow: 'hidden'
      }}
    >
      {/* Köpük animasyonu */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <Typography
            key={i}
            sx={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 2 + 1}rem`,
              opacity: 0.4,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              '@keyframes float': {
                '0%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-30px)' },
                '100%': { transform: 'translateY(0)' }
              }
            }}
          >
            🫧
          </Typography>
        ))}
      </Box>

      {/* Başlık */}
      <Box sx={{ zIndex: 1, textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#6a4c93' }}>
          🏡 {characterName} için Duygusal Ev: {homeSceneTitle}
        </Typography>
      </Box>

      {/* Sahne kutuları */}
      <Box sx={{ zIndex: 1, width: '100%', maxWidth: 700 }}>
        {favorites.map((scene) => (
          <Box
            key={scene._id}
            sx={{
              mb: 3,
              p: 3,
              backgroundColor: scene.color || '#fce4ec',
              borderRadius: 4,
              boxShadow: 4
            }}
          >
            <Link
              to={`/scene/${scene.title}?characterId=${characterId}`}
              style={{ textDecoration: 'none' }}
            >
              <Typography variant="h6" sx={{ cursor: 'pointer', color: '#6a4c93' }}>
                {scene.title} {scene._id === homeSceneId && '🏡'}
              </Typography>
            </Link>
            
            <Typography variant="body2" sx={{ mb: 1 }}>
              Mood: {scene.mood}
            </Typography>
            {scene._id === homeSceneId && (
              <Chip label="Duygusal Ev" color="primary" sx={{ mt: 1 }} />
            )}
            <Link to={`/dashboard/${characterId}`} style={{ textDecoration: 'none' }}>
  <Button
    variant="contained"
    sx={{
      mt: 4,
      px: 3,
      py: 1.5,
      borderRadius: 4,
      boxShadow: 3,
      fontWeight: 'bold',
      fontSize: '1rem',
      backgroundColor: '#cdb4db',
      color: '#fff',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#bfa2d3',
        boxShadow: 4
      }
    }}
  >
    🐾 Karakter Sayfasına Dön
  </Button>
</Link>

          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FavoritesPage;
