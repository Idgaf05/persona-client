import React from 'react';
import axios from 'axios';
import { Card, Typography, Button } from '@mui/material';

const SceneSuggestion = ({ emotions, characterId }) => {
  const [scenes, setScenes] = React.useState([]);

  React.useEffect(() => {
    const fetchScenes = async () => {
      const res = await axios.post('/api/scenes/suggest', { emotions });
      setScenes(res.data.scenes);
    };
    fetchScenes();
  }, [emotions]);

  const handleFavorite = async (scene) => {
    try {
      await axios.post('/api/scenes/favorite', { characterId, scene });
      alert('Favori sahne kaydedildi! ⭐');
    } catch (err) {
      console.error('Favori sahne kaydedilemedi:', err);
    }
  };

  return (
    <>
      {scenes.map((scene, index) => (
        <Card key={index} sx={{ marginBottom: 2, padding: 2, backgroundColor: scene.color }}>
          <Typography variant="h6">{scene.title}</Typography>
          <Typography variant="body2">{scene.mood}</Typography>
          <Button onClick={() => handleFavorite(scene)}>Favori Yap ⭐</Button>
        </Card>
      ))}
    </>
  );
};

export default SceneSuggestion;
