import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('Loading', () => {
  it('should render Loading', () => {
    render(<Loading />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
