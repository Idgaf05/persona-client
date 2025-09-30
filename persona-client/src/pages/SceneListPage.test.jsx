// src/pages/SceneListPage.test.jsx
import { render, screen } from '@testing-library/react';
import SceneListPage from './SceneListPage';

describe('🎬 SceneListPage', () => {
  it('renders scene list title', () => {
    render(<SceneListPage />);
    expect(screen.getByText(/Tüm Sahne Listesi/i)).toBeInTheDocument();
  });
});
