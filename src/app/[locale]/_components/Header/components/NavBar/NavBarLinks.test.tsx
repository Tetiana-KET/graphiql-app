import { AuthContext } from '@/components/AuthProvider';
import { usePathname } from 'next/navigation';
import { describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from '@nextui-org/react';
import NavBarLinks from './NavBarLinks';
import {
  mockAuthContextValue,
  mockUnAuthContextValue,
} from '../../../../../../../__tests__/msw/mock';

describe('NavBarLinks', () => {
  beforeEach(() => {
    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue('/rest');
  });

  const renderComponent = (authContextValue = mockAuthContextValue) => {
    return render(
      <AuthContext.Provider value={authContextValue}>
        <Navbar>
          <NavBarLinks />
        </Navbar>
      </AuthContext.Provider>,
    );
  };

  it('renders the NavBarLinks', () => {
    renderComponent();
    expect(screen.getByTestId('navBarLinks')).toBeInTheDocument();
  });

  it('applies active class to the current route', () => {
    renderComponent();

    const restClient = screen.getByTestId('restClient') as HTMLElement;
    expect(restClient).toBeInTheDocument();

    const link = restClient.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('hides links when user is not logged in', () => {
    renderComponent(mockUnAuthContextValue);
    screen.debug();
    expect(screen.getByTestId('restClient')).toHaveClass('hidden');
  });
});
