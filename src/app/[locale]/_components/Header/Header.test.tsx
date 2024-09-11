import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';

vi.mock('./components/NavBar/NavBarLinks', () => ({
  default: () => <div data-testid="navBarLinks" />,
}));

vi.mock('./components/AuthButtons/AuthButtons', () => ({
  default: () => <div data-testid="authButtons" />,
}));

vi.mock('./components/NavBarMenuBurger/NavBarMenuBurger', () => ({
  default: () => <div data-testid="navBarMenuBurger" />,
}));

describe('Header', () => {
  it('renders Header with all main elements', () => {
    render(<Header />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('navbarMenuToggle')).toBeInTheDocument();
    expect(screen.getByTestId('navbarBrand')).toBeInTheDocument();
    expect(screen.getByTestId('navBarLinks')).toBeInTheDocument();
    expect(screen.getByTestId('authButtons')).toBeInTheDocument();
    expect(screen.getByTestId('navBarMenuBurger')).toBeInTheDocument();
  });

  it('sets isSticky to true when scrolled', () => {
    render(<Header />);

    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);

    expect(screen.getByTestId('header')).toHaveAttribute(
      'data-isSticky',
      'true',
    );
  });

  it('sets isSticky to false when not scrolled', () => {
    render(<Header />);

    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    fireEvent.scroll(window);

    expect(screen.getByTestId('header')).toHaveAttribute(
      'data-isSticky',
      'false',
    );
  });

  it('toggles the menu open and closed', () => {
    render(<Header />);

    const navbarMenuToggle = screen.getByTestId('navbarMenuToggle');
    expect(screen.getByTestId('navbarMenuToggle')).toHaveAttribute(
      'aria-label',
      'Open menu',
    );

    fireEvent.click(navbarMenuToggle);

    expect(navbarMenuToggle).toHaveAttribute('aria-label', 'Close menu');
  });
});
