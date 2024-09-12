import { render, screen } from '@testing-library/react';
import SectionDivider from './SectionDivider';

describe('SectionDivider', () => {
  it('is rendered with correct context', () => {
    render(<SectionDivider title="title" />);

    expect(screen.getByTestId('SectionDivider')).toBeInTheDocument();
    expect(screen.getByTestId('SectionDividerTitle')).toBeInTheDocument();

    expect(screen.getByTestId('SectionDividerTitle')).toHaveTextContent(
      'title',
    );
  });
});
