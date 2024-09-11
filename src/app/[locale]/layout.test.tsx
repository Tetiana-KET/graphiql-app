import { render, screen } from '@testing-library/react';
import { i18nNamespaces } from '@/consts/i18nNameSpaces';

import initTranslations from '../i18n';
import Layout, { generateStaticParams } from './layout';

vi.mock('../i18n', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    resources: {
      translation: {
        key: 'value',
      },
    },
  })),
}));

vi.mock('@/components/TranslationsProvider', () => ({
  __esModule: true,
  default: vi.fn(({ children }) => children),
}));

vi.mock('@nextui-org/react', () => ({
  NextUIProvider: vi.fn(({ children }) => children),
}));

vi.mock('./_components/Header/Header', () => ({
  __esModule: true,
  default: vi.fn(() => <header data-testid="header">Header</header>),
}));

vi.mock('./_components/Footer/Footer', () => ({
  __esModule: true,
  default: vi.fn(() => <footer data-testid="footer">Footer</footer>),
}));

describe('Layout component', () => {
  const locale = 'en';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Layout with children, header, and footer', async () => {
    const layout = await Layout({
      children: <div data-testid="child">Child Content</div>,
      params: { locale },
    });

    render(layout);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('initializes translations with the correct locale and namespaces', async () => {
    await initTranslations(locale, i18nNamespaces);
    expect(initTranslations).toHaveBeenCalledWith(locale, i18nNamespaces);
  });

  it('should return an array of locales wrapped in an object', () => {
    const result = generateStaticParams();

    expect(Array.isArray(result)).toBe(true);

    result.forEach((param) => {
      expect(param).toEqual(
        expect.objectContaining({ locale: expect.any(String) }),
      );
    });
  });
});
