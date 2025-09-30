// src/components/CatCelebration.test.jsx
import { render, screen } from '@testing-library/react';
import CatCelebration from './CatCelebration';


describe('🐱 CatCelebration', () => {
  it('renders initial emoji and message', () => {
    render(<CatCelebration />);
    expect(screen.getByText(/Kedicik hep seninle/i)).toBeInTheDocument();
  });
});
