import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const emojiCycle = ['🎉🐱👏', '🐱💖', '🐾🎊', '🐱✨', '🐱🎈'];

const CatCelebration = () => {
  const [currentEmoji, setCurrentEmoji] = useState(emojiCycle[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => {
        const currentIndex = emojiCycle.indexOf(prev);
        const nextIndex = (currentIndex + 1) % emojiCycle.length;
        return emojiCycle[nextIndex];
      });
    }, 2000); // 2 saniyede 

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        backgroundColor: '#fff0f6',
        borderRadius: 3,
        boxShadow: 3,
        px: 2,
        py: 1,
        textAlign: 'center',
        zIndex: 9999
      }}
    >
      <Typography sx={{ fontSize: '2rem', color: '#ff80ab' }}>
        {currentEmoji}
      </Typography>
      <Typography sx={{ fontSize: '0.9rem', mt: 0.5 }}>
        Kedicik hep seninle!
      </Typography>
    </Box>
  );
};

export default CatCelebration;
