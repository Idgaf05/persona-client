// src/pages/CharacterDashboard.test.jsx
import { render, screen } from '@testing-library/react';
import CharacterDashboard from './CharacterDashboard';

describe('🎭 CharacterDashboard', () => {
  it('shows loading spinner initially', () => {
    render(<CharacterDashboard characterId="123" />);
    expect(screen.getByText(/Kedicik karakterini getiriyor/i)).toBeInTheDocument();
  });
});
