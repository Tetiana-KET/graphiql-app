import { usePathname } from 'next/navigation';
import { describe, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { Navbar } from '@nextui-org/react';
import NavBarLinks from './NavBarLinks';
import {
  mockAuthContextValue,
  mockUnAuthContextValue,
} from '../../../../../../../__tests__/msw/mock';
import { renderWithAuth } from '../../../../../../../__tests__/testUtils';

const children = (
  <Navbar>
    <NavBarLinks />
  </Navbar>
);

describe('NavBarLinks', () => {
  beforeEach(() => {
    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue('/rest');
  });

  it('renders the NavBarLinks', () => {
    renderWithAuth({
      children,
      authContextValue: mockAuthContextValue,
    });
    expect(screen.getByTestId('navBarLinks')).toBeInTheDocument();
  });

  it('applies active class to the current route', () => {
    renderWithAuth({
      children,
      authContextValue: mockAuthContextValue,
    });

    const restClient = screen.getByTestId('restClient') as HTMLElement;
    expect(restClient).toBeInTheDocument();

    const link = restClient.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('hides links when user is not logged in', () => {
    renderWithAuth({
      children,
      authContextValue: mockUnAuthContextValue,
    });
    expect(screen.getByTestId('restClient')).toHaveClass('hidden');
  });
});
