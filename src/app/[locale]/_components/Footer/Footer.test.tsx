import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
  it('is rendered', () => {
    render(<Footer />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
