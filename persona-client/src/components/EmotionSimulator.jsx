import {
  Box,
  Typography,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

const EmotionSimulator = ({ onUpdate, characterId }) => {
  const [selectedScene, setSelectedScene] = useState('');
  const [sceneOptions, setSceneOptions] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchScenes = async () => {
      const res = await axios.get('/api/scenes');
      setSceneOptions(res.data);
    };
    fetchScenes();
  }, []);

  const simulate = async (sceneTitle) => {
    const res = await axios.post('/api/simulate', {
      characterId,
      scene: sceneTitle
    });
    const updatedEmotions = res.data.emotions;
    onUpdate(updatedEmotions, sceneTitle);
  };
  return (
    <Box sx={{ marginTop: 4 }}>
     <Typography sx={{ mb: 2 }}>Sahne Seç 🎭</Typography>
<ToggleButtonGroup
  value={selectedScene}
  exclusive
  onChange={(e, val) => setSelectedScene(val)}
  sx={{ mb: 3 }}
>
  {sceneOptions.map((scene) => (
    <ToggleButton key={scene._id} value={scene.title}>
      {scene.title}
    </ToggleButton>
  ))}
</ToggleButtonGroup>

<Button
  variant="contained"
  disabled={!selectedScene}
  onClick={() => simulate(selectedScene)}
  sx={{ backgroundColor: '#ff80ab', borderRadius: 3 }}
>
  Simüle Et 🎬
</Button>


      {response && (
        <Box sx={{ marginTop: 2 }}>
          <Typography>🧠 Tepkiler:</Typography>
          {Object.entries(response).map(([key, val]) => (
            <Typography key={key}>{key}: {val}</Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default EmotionSimulator;
