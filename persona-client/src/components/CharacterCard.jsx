import { Card, Typography, Box, LinearProgress } from '@mui/material';

const EmotionBar = ({ label, value, color }) => (
  <Box sx={{ marginBottom: 2 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography sx={{ textTransform: "capitalize" }}>{label}</Typography>
      <Typography>{value}%</Typography>
    </Box>
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height: 10,
        borderRadius: 5,
        backgroundColor: '#fce4ec',
        '& .MuiLinearProgress-bar': { backgroundColor: color }
      }}
    />
  </Box>
);

const emotionColors = {
  happiness: "#ffca28",
  sadness: "#42a5f5",
  anger: "#ef5350",
  fear: "#ab47bc",
  surprise: "#66bb6a",
  default: "#ff80ab"
};

const CharacterCard = ({ character }) => {
  const { name, background, emotions } = character;

  return (
    <Card sx={{ padding: 3,mb :3, backgroundColor: '#fff0f6', borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>{name}</Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>{background}</Typography>
      {Object.entries(emotions).map(([key, value]) => (
        <EmotionBar
          key={key}
          label={key}
          value={value}
          color={emotionColors[key] || emotionColors.default}
        />
      ))}
    </Card>
  );
};

export default CharacterCard;
