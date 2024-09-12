import { render } from '@testing-library/react';
import RootLayout from './layout';

vi.mock('@/components/AuthProvider', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('notistack', () => ({
  SnackbarProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('RootLayout', () => {
  const mockChildren = <div>Test Child</div>;
  const mockLocale = 'en';

  it('renders children and applies locale to html tag', () => {
    const { container } = render(
      <RootLayout params={{ locale: mockLocale }}>{mockChildren}</RootLayout>,
    );

    expect(container.querySelector('html')?.getAttribute('lang')).toBe(
      mockLocale,
    );

    expect(container).toHaveTextContent('Test Child');
  });
});
