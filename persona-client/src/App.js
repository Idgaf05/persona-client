// App.jsx
import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BattlePage from './pages/BattlePage';

import CharacterDashboardWrapper from './pages/CharacterDashboardWrapper';
import CharacterSelect from './pages/CharacterSelect';
import CharacterCreate from './pages/CharacterCreate';
import FavoritesPage from './pages/FavoritesPage';
import ScenePage from './pages/ScenePage';
import SceneListPage from './pages/SceneListPage';

const theme = createTheme({
  palette: {
    background: { default: '#fdf6f8' },
    primary: { main: '#ff80ab' },
    secondary: { main: '#6a4c93' }
  },
  typography: {
    fontFamily: 'Segoe UI, sans-serif'
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/battle" element={<BattlePage />} />

          <Route path="/" element={<CharacterSelect />} />
          <Route path="/create" element={<CharacterCreate />} />
          <Route path="/dashboard/:characterId" element={<CharacterDashboardWrapper />} />
          <Route path="/favorites/:characterId" element={<FavoritesPage />} />
          <Route path="/scenes/:characterId" element={<SceneListPage />} /> {/*  Tüm sahne listesi */}
          <Route path="/scene/:title" element={<ScenePage />} /> {/*  Sahne detay */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
