import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HistoryPage from './page';

vi.mock('./components/HistoryList', () => ({
  __esModule: true,
  default: () => <div>Mocked HistoryList</div>,
}));

describe('HistoryPage', () => {
  it('should render correctly', () => {
    render(<HistoryPage />);
    expect(screen.getByText('Mocked HistoryList')).toBeInTheDocument();
  });

  it('should render HistoryList component', () => {
    render(<HistoryPage />);
    expect(screen.getByText('Mocked HistoryList')).toBeInTheDocument();
  });
});
