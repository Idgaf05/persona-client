import React from 'react';
import { useParams } from 'react-router-dom';
import CharacterDashboard from './CharacterDashboard';

const CharacterDashboardWrapper = () => {
  const { characterId } = useParams();
  return <CharacterDashboard characterId={characterId} />

};

export default CharacterDashboardWrapper;
