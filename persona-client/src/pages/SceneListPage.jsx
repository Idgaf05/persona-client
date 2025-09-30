import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Chip, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

const SceneListPage = () => {
  const [scenes, setScenes] = useState([]);
  const { characterId } = useParams();

  useEffect(() => {
    const fetchScenes = async () => {
      const res = await axios.get(`/api/scenes?characterId=${characterId}`);
      setScenes(res.data);
    };
    fetchScenes();
  }, [characterId]);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #bde0fe 0%, #ffc8dd 100%)',
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
              opacity: 0.3,
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
          🎬 Tüm Sahne Listesi
        </Typography>
      </Box>

      {/* Sahne kutuları */}
      <Box sx={{ zIndex: 1, maxWidth: 800, mx: 'auto' }}>
        {scenes.map((scene) => (
          <Box
            key={scene._id}
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: scene.color || '#fce4ec',
              borderRadius: 4,
              boxShadow: 3
            }}
          >
            {scene.weights && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: '#fff0f6',
                  borderRadius: 3,
                  boxShadow: 2
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#6a4c93', mb: 1 }}>
                  🎯 Duygusal Etki Haritası
                </Typography>
                {Object.entries(scene.weights).map(([emotion, value]) => (
                  <Typography
                    key={emotion}
                    variant="body2"
                    sx={{
                      fontStyle: 'italic',
                      color: value > 0 ? '#4caf50' : '#f44336',
                      mb: 0.5
                    }}
                  >
                    {emotion}: {value > 0 ? `desteklenir (+${value})` : `zorlanır (${value})`}
                  </Typography>
                ))}
              </Box>
            )}

            <Link to={`/scene/${scene._id}?characterId=${characterId}`} style={{ textDecoration: 'none' }}>
              <Typography variant="h5" sx={{ color: '#6a4c93', mb: 1 }}>
                {scene.title}
              </Typography>
            </Link>

            <Chip label={`Mood: ${scene.mood}`} color="secondary" sx={{ mb: 2 }} />

            {scene.story && (
              <Typography variant="body1" sx={{ mb: 1 }}>
                📝 {scene.story}
              </Typography>
            )}

            {scene.compatibility !== undefined && (
              <Box sx={{ mt: 1 }}>
                <Chip
                  label={`Uyum: %${scene.compatibility}`}
                  color={
                    scene.compatibility > 70
                      ? 'success'
                      : scene.compatibility > 40
                      ? 'warning'
                      : 'error'
                  }
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
  {scene.compatibility > 70
    ? '✨ Karakter bu sahneye çok uygun.'
    : scene.compatibility > 40
    ? '🤔 Kısmen uygun, dikkatli ilerlenmeli.'
    : '😿 Hazırlık seviyesi düşük, sahne zorlayıcı olabilir.'}
</Typography>

              </Box>
            )}

            {scene.resonatesWith?.length > 0 && (
              <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 1 }}>
                Bu sahne özellikle şu karakterlerle özdeşleşiyor: {scene.resonatesWith.join(', ')}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* Navigasyon butonları */}
      <Box
        sx={{
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          flexWrap: 'wrap',
          mt: 4
        }}
      >
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
              backgroundColor: '#ffd6a5',
              color: '#6a4c93',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#ffb997',
                boxShadow: 4
              }
            }}
          >
            🏠 Anasayfaya Dön
          </Button>
        </Link>

        <Link to={`/dashboard/${characterId}`} style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
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
            👨‍🎤 Karakter Sayfasına Dön
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default SceneListPage;
