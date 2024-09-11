import { render, screen } from '@testing-library/react';
import Home from './page';

vi.mock('./_components/UserGreeting/UserGreeting', () => ({
  default: () => <div data-testid="userGreeting" />,
}));

vi.mock('./_components/WelcomeMainContent/WelcomeMainContent', () => ({
  default: ({ t }: { t: (key: string) => string }) => (
    <div data-testid="welcomeMainContent">{t('welcome')}</div>
  ),
}));

describe('Home component', () => {
  it('renders UserGreeting and WelcomeMainContent', async () => {
    render(await Home({ params: { locale: 'en' } }));

    expect(await screen.findByTestId('userGreeting')).toBeInTheDocument();
    expect(await screen.findByTestId('welcomeMainContent')).toBeInTheDocument();

    expect(screen.getByTestId('welcomeMainContent')).toHaveTextContent(
      'welcome',
    );
  });
});
