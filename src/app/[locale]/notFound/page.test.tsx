import { render, screen } from '@testing-library/react';
import CustomNotFoundPage from './page';

describe('CustomNotFoundPage', () => {
  it('renders NotFoundPage', () => {
    render(<CustomNotFoundPage />);
    
    expect(screen.getByTestId('notFoundPage')).toBeInTheDocument();
  });
});
