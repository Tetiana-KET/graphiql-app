import { AuthContext } from '@/components/AuthProvider';
import { usePathname } from 'next/navigation';
import { describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from '@nextui-org/react';
import NavBarLinks from './NavBarLinks';
import { mockUser } from '../../../../../../../__tests__/msw/mock';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(() => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
    },
  })),
}));

describe('NavBarLinks', () => {
  const mockAuthContextValue = {
    isLoggedIn: true,
    loading: false,
    userName: 'User Name',
    user: mockUser,
  };

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
    renderComponent({
      isLoggedIn: false,
      loading: false,
      userName: '',
      user: mockUser,
    });
    screen.debug();
    expect(screen.getByTestId('restClient')).toHaveClass('hidden');
  });
});
