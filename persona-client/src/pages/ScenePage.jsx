import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Box, Typography, Button, Chip } from '@mui/material';

const moodDescriptions = {
  playful: 'Hayal gücünü köpüklerle besleyen bir sahne 💭',
  melancholic: 'Sessiz ve içe dönük bir yürüyüş alanı 🕯️',
  intense: 'Duyguların patladığı bir içsel fırtına 🔥',
  tense: 'Sislerin içinde kaybolan bir bilinmezlik 🌫️',
  mystery: 'Gizemli bir mektubun açıldığı an ✉️',
  neutral: 'Sakin ve dengeli bir atmosfer 🏡'
};

const ScenePage = () => {
  const { title } = useParams();
  const [scene, setScene] = useState(null);
  const [searchParams] = useSearchParams();
  const characterId = searchParams.get('characterId');

  useEffect(() => {
    const fetchScene = async () => {
      const res = await axios.get('/api/scenes');
      const match = res.data.find((s) => s.title === title);
      setScene(match);
    };
    fetchScene();
  }, [title]);

  if (!scene) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography>Sahne yükleniyor... 🎭</Typography>
      </Box>
    );
  }

  const moodText = moodDescriptions[scene.mood] || 'Bu sahne özel bir atmosfer sunuyor.';

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #bde0fe 0%, #ffc8dd 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 4
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

      {/* Sahne kutusu */}
      <Box
        sx={{
          zIndex: 1,
          backgroundColor: '#ffffffcc',
          borderRadius: 4,
          padding: 5,
          boxShadow: 6,
          maxWidth: 600,
          textAlign: 'center'
        }}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          {scene.title} 🎬
        </Typography>

        <Chip label={`Mood: ${scene.mood}`} color="secondary" sx={{ mb: 2 }} />

        <Typography variant="h5" sx={{ mb: 2 }}>
          {moodText}
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Bu sahne karakterin duygusal evini temsil ediyor. İçsel dünyasıyla en çok uyumlu olan atmosfer burası.
        </Typography>

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
              backgroundColor: '#ffb4d4',
              color: '#6a4c93',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#ffc8dd',
                boxShadow: 4
              }
            }}
          >
            ⭐ Favorilere Dön
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ScenePage;
