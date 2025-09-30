import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  Avatar,
  Grid,
  Button,
  Modal,
  TextField
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const CharacterSelect = () => {
  const [characters, setCharacters] = useState([]);
  const [editChar, setEditChar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      const res = await axios.get('/api/characters');
      setCharacters(res.data);
    };
    fetchCharacters();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/characters/${id}`);
    const res = await axios.get('/api/characters');
    setCharacters(res.data);
  };

  return (
   <Box
  sx={{
    padding: 16,
    maxWidth: 1200,
    mx: 'auto',
    backgroundColor: '#fff0f6',
    borderRadius: 6,
    boxShadow: 4
  }}
>
  <Typography variant="h4" sx={{ mb: 3, color: '#6a4c93' }}>
    Karakterini Seç 🐱
  </Typography>

  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
    

    <Link to="/create" style={{ textDecoration: 'none' }}>
      <Button
        variant="outlined"
        color="primary"
        sx={{
          borderRadius: 3,
          fontWeight: 'bold',
          textTransform: 'none',
          backgroundColor: '#bde0fe',
          color: '#6a4c93',
          '&:hover': {
            backgroundColor: '#a2d2ff'
          }
        }}
      >
        + Yeni Karakter Oluştur
      </Button>
    </Link>
  </Box>

  <Grid container spacing={4}>
    {characters.map((char) => (
      <Grid item xs={12} sm={6} md={4} key={char._id}>
        <Card
          sx={{
            backgroundColor: '#fdf6f8',
            borderRadius: 4,
            boxShadow: 3,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'scale(1.03)' }
          }}
        >
          <CardActionArea onClick={() => navigate(`/dashboard/${char._id}`)} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: '#ffc8dd',
                  fontSize: '2rem',
                  width: 56,
                  height: 56
                }}
              >
                {char.avatar || '🐱'}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ color: '#6a4c93' }}>{char.name}</Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>{char.background}</Typography>
              </Box>
            </Box>
          </CardActionArea>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, pb: 2 }}>
            <Button size="small" color="error" onClick={() => handleDelete(char._id)}>🗑️ Sil</Button>
            <Button size="small" sx={{ ml: 1 }} onClick={() => setEditChar(char)}>✏️ Düzenle</Button>
          </Box>
        </Card>
      </Grid>
    ))}
  </Grid>

  {/* Düzenleme Modalı */}
  {/* Düzenleme Modalı */}
<Modal open={!!editChar} onClose={() => setEditChar(null)}>
  <Box
    sx={{
      backgroundColor: '#fff',
      p: 4,
      width: 400,
      mx: 'auto',
      mt: 10,
      borderRadius: 4,
      boxShadow: 5
    }}
  >
    <Typography variant="h6" sx={{ mb: 3, color: '#6a4c93' }}>
      ✏️ Karakteri Düzenle
    </Typography>

    <TextField
      label="İsim"
      fullWidth
      value={editChar?.name || ''}
      onChange={(e) => setEditChar({ ...editChar, name: e.target.value })}
      sx={{ mb: 2 }}
    />
    <TextField
      label="Yaş"
      fullWidth
      value={editChar?.age || ''}
      onChange={(e) => setEditChar({ ...editChar, age: e.target.value })}
      sx={{ mb: 2 }}
    />
    <TextField
      label="Arkaplan"
      fullWidth
      value={editChar?.background || ''}
      onChange={(e) => setEditChar({ ...editChar, background: e.target.value })}
      sx={{ mb: 3 }}
    />

    {/* Avatar öneri paneli */}
    <Typography sx={{ mb: 1 }}>Avatar Seç 🎨</Typography>
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
      {['😺', '🦊', '🐰', '🐼', '🐸', '🐻', '🐨', '🐥', '🧚‍♀️', '🧙‍♂️'].map((emoji) => (
        <Button
          key={emoji}
          variant={editChar?.avatar === emoji ? 'contained' : 'outlined'}
          onClick={() => setEditChar({ ...editChar, avatar: emoji })}
          sx={{
            minWidth: 48,
            height: 48,
            fontSize: '1.5rem',
            borderRadius: 2,
            backgroundColor: editChar?.avatar === emoji ? '#ffc8dd' : undefined
          }}
        >
          {emoji}
        </Button>
      ))}
    </Box>

    <Button
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: '#ff80ab',
        fontWeight: 'bold',
        textTransform: 'none',
        borderRadius: 3,
        '&:hover': {
          backgroundColor: '#ff5c8a'
        }
      }}
      onClick={async () => {
        await axios.put(`/api/characters/${editChar._id}`, editChar);
        setEditChar(null);
        const res = await axios.get('/api/characters');
        setCharacters(res.data);
      }}
    >
      💾 Kaydet
    </Button>
  </Box>
</Modal>

</Box>

  );
};

export default CharacterSelect;
