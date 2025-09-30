import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Slider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const avatarOptions = ['😺', '🦊', '🐰', '🐼', '🐸', '🐻', '🐨', '🐥', '🧚‍♀️', '🧙‍♂️'];

const CharacterCreate = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    background: '',
    avatar: '😺',
    emotions: {
      anger: 10,
      joy: 50,
      fear: 30,
      sadness: 20,
      surprise: 40
    }
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e, newAvatar) => {
    if (newAvatar) {
      setForm({ ...form, avatar: newAvatar });
    }
  };

  const handleEmotionChange = (emotion, value) => {
    setForm({
      ...form,
      emotions: { ...form.emotions, [emotion]: value }
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/characters', {
        ...form,
        personality: {
          openness: 70,
          conscientiousness: 60,
          extraversion: 50,
          agreeableness: 65,
          neuroticism: 40
        },
        emotions: form.emotions
      });
      navigate(`/dashboard/${res.data._id}`);
    } catch (err) {
      console.error('Karakter oluşturulamadı:', err);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 520,
        mx: 'auto',
        mt: 6,
        backgroundColor: '#fff0f6',
        borderRadius: 6,
        boxShadow: 4
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, color: '#6a4c93' }}>
        Yeni Karakter Oluştur 🐱
      </Typography>

      <TextField
        label="İsim"
        name="name"
        fullWidth
        value={form.name}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Yaş"
        name="age"
        fullWidth
        value={form.age}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Takma Ad"
        name="background"
        fullWidth
        value={form.background}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />

      <Typography sx={{ mb: 1 }}>Avatar Seç 🎨</Typography>
      <ToggleButtonGroup
        value={form.avatar}
        exclusive
        onChange={handleAvatarChange}
        sx={{ mb: 2, flexWrap: 'wrap' }}
      >
        {avatarOptions.map((icon) => (
          <ToggleButton key={icon} value={icon} sx={{ width: 48, height: 48 }}>
            <Typography fontSize="1.5rem">{icon}</Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Avatar kutusu */}
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: '#fce4ec',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          boxShadow: 2,
          mb: 4
        }}
      >
        {form.avatar}
      </Box>

      <Typography sx={{ mb: 2 }}>Duygusal Profil 🎭</Typography>
      {['anger', 'joy', 'fear', 'sadness', 'surprise'].map((emotion) => (
        <Box key={emotion} sx={{ mb: 3 }}>
          <Typography>{emotion.toUpperCase()}</Typography>
          <Slider
            value={form.emotions[emotion]}
            onChange={(e, val) => handleEmotionChange(emotion, val)}
            step={1}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            sx={{ color: '#ff80ab' }}
          />
        </Box>
      ))}

  <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    gap: 2,
    mt: 4,
    flexWrap: 'wrap'
  }}
>
  <Button
    variant="contained"
    onClick={handleSubmit}
    sx={{
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
    Oluştur ve Başla 🎬
  </Button>

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
      🏠 Ana Sayfaya Dön
    </Button>
  </Link>
</Box>


    </Box>
  );
};

export default CharacterCreate;
