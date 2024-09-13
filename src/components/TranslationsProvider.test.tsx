import { render } from '@testing-library/react';
import initTranslations from '@/app/i18n';
import TranslationsProvider from './TranslationsProvider';

vi.mock('react-i18next', () => ({
  I18nextProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/app/i18n', () => ({
  default: vi.fn(),
}));

describe('TranslationsProvider', () => {
  const mockChildren = <div>Test Child</div>;
  const mockLocale = 'en';
  const mockNamespaces = ['common'];
  const mockResources = { en: { common: {} } };

  it('renders children and initializes i18n with correct parameters', () => {
    render(
      <TranslationsProvider
        locale={mockLocale}
        namespaces={mockNamespaces}
        resources={mockResources}
      >
        {mockChildren}
      </TranslationsProvider>,
    );

    expect(initTranslations).toHaveBeenCalledWith(
      mockLocale,
      mockNamespaces,
      expect.any(Object),
      mockResources,
    );

    expect(document.body).toHaveTextContent('Test Child');
  });
});
