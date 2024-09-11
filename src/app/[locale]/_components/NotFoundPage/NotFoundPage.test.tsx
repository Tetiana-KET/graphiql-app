import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<NotFoundPage />);

    expect(screen.getByTestId('notFoundPage')).toBeInTheDocument();
    expect(screen.getByTestId('notFoundPageText')).toHaveTextContent(
      'notFound:oops',
    );
  });

  it('navigates to home on button click', () => {
    render(<NotFoundPage />);

    const link = screen.getByTestId('notFoundPage').querySelector('a');

    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveTextContent('notFound:homeBtn');
  });
});
