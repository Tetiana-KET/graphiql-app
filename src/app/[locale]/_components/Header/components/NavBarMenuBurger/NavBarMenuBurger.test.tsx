import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { AuthContext } from '@/components/AuthProvider';
import { navigationList } from '@/consts/navigationList';
import { usePathname } from 'next/navigation';
import NavBarMenuBurger from './NavBarMenuBurger';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('next/link', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@nextui-org/react', () => ({
  NavbarMenu: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  NavbarMenuItem: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
  }) => (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onClick={onClick} className={className}>
      {children}
    </div>
  ),
}));

vi.mock('../../../LanguageDropDown/LanguageDropDown', () => ({
  default: () => <div>LanguageDropDown</div>,
}));

describe('NavBarMenuBurger', () => {
  const mockAuthContextValue = (overrides = {}) => ({
    isLoggedIn: false,
    loading: false,
    userName: '',
    user: null,
    ...overrides,
  });

  afterEach(() => {
    (usePathname as Mock).mockReturnValue('/');
  });

  it('renders navigation items correctly', () => {
    const setIsMenuOpen = vi.fn();
    const isMenuOpen = true;

    render(
      <AuthContext.Provider value={mockAuthContextValue()}>
        <NavBarMenuBurger
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
        />
      </AuthContext.Provider>,
    );

    navigationList.forEach((item) => {
      const navItem = screen.getByText(`layout:${item.title}`);
      expect(navItem).toBeInTheDocument();
    });
  });

  it('hides navigation items when user is not logged in', () => {
    const setIsMenuOpen = vi.fn();
    const isMenuOpen = true;

    render(
      <AuthContext.Provider value={mockAuthContextValue()}>
        <NavBarMenuBurger
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
        />
      </AuthContext.Provider>,
    );

    navigationList.forEach((item) => {
      const navItem = screen.getByText(`layout:${item.title}`);
      expect(navItem?.parentElement).toHaveClass('hidden');
    });
  });

  it('closes menu on clicking a navigation item', () => {
    const setIsMenuOpen = vi.fn();
    const isMenuOpen = true;

    render(
      <AuthContext.Provider value={mockAuthContextValue({ isLoggedIn: true })}>
        <NavBarMenuBurger
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
        />
      </AuthContext.Provider>,
    );

    navigationList.forEach((item) => {
      const navItem = screen.getByText(`layout:${item.title}`);
      fireEvent.click(navItem);
      expect(setIsMenuOpen).toHaveBeenCalledWith(isMenuOpen);
    });
  });

  it('renders the LanguageDropDown component', () => {
    const setIsMenuOpen = vi.fn();
    const isMenuOpen = true;

    render(
      <AuthContext.Provider value={mockAuthContextValue({ isLoggedIn: true })}>
        <NavBarMenuBurger
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
        />
      </AuthContext.Provider>,
    );

    expect(screen.getByText('LanguageDropDown')).toBeInTheDocument();
  });
});
