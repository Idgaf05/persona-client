import { render, screen } from '@testing-library/react';
import BattlePage from './BattlePage';
import { MemoryRouter } from 'react-router-dom';

describe('⚔️ BattlePage', () => {
  it('renders page title', () => {
    render(
      <MemoryRouter>
        <BattlePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Kedicik Savaş Arenası/i)).toBeInTheDocument();
  });

  it('disables start button when less than 3 characters selected', () => {
    render(
      <MemoryRouter>
        <BattlePage />
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: /Savaşı Başlat/i });
    expect(button).toBeDisabled();
  });
});
