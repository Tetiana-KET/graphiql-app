import { render, screen } from '@testing-library/react';
import { EmptyHistory } from './EmptyHistory';

describe('EmptyHistory Component', () => {
  it('EmptyHistory Component renders as expected', () => {
    render(<EmptyHistory />);

    expect(screen.getByText('history:emptyHistoryMessage')).toBeInTheDocument();
  });
});
