import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, Box } from '@mui/material';

const FavoriteSceneList = ({ characterId }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`/api/scenes/favorite/${characterId}`);
        setFavorites(res.data);
      } catch (err) {
        console.error('Favori sahneler alınamadı:', err);
      }
    };
    fetchFavorites();
  }, [characterId]);

  if (favorites.length === 0) {
    return <Typography sx={{ mt: 2 }}>Henüz favori sahne yok 🐾</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Favori Sahnelerin ⭐</Typography>
      {favorites.map((scene, index) => (
        <Card key={index} sx={{ mb: 2, p: 2, backgroundColor: scene.color }}>
          <Typography variant="h6">{scene.title}</Typography>
          <Typography variant="body2">Mood: {scene.mood}</Typography>
        </Card>
      ))}
    </Box>
  );
};

export default FavoriteSceneList;
