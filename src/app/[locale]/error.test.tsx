import { render, screen } from '@testing-library/react';
import ErrorError from './error';

describe('ErrorError component', () => {
  it('renders the error message correctly', () => {
    const mockError = new Error('Something went wrong!');

    render(<ErrorError error={mockError} />);

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });
});
