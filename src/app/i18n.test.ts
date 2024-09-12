import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import initTranslations from './i18n';
import i18nConfig from '../../i18nConfig';

vi.mock('i18next', () => ({
  createInstance: vi.fn(() => ({
    use: vi.fn().mockReturnThis(),
    init: vi.fn().mockResolvedValue(true),
    services: {
      resourceStore: {
        data: {},
      },
    },
    t: vi.fn(),
  })),
}));

vi.mock('react-i18next', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    initReactI18next: actual.initReactI18next,
  };
});

describe('initTranslations', () => {
  const mockLocale = 'en';
  const mockNamespaces = ['common'];

  it('sets preload to empty array when resources are provided', async () => {
    const mockResources = { en: { common: {} } };
    const i18nInstance = createInstance();

    await initTranslations(
      mockLocale,
      mockNamespaces,
      i18nInstance,
      mockResources,
    );

    expect(i18nInstance.init).toHaveBeenCalledWith(
      expect.objectContaining({
        preload: [],
      }),
    );
  });

  it('sets preload to i18nConfig.locales when resources are not provided', async () => {
    const i18nInstance = createInstance();

    await initTranslations(mockLocale, mockNamespaces, i18nInstance);

    expect(i18nInstance.init).toHaveBeenCalledWith(
      expect.objectContaining({
        preload: i18nConfig.locales,
      }),
    );
  });

  it('should use initReactI18next plugin', async () => {
    const i18nInstance = createInstance();

    await initTranslations(mockLocale, mockNamespaces, i18nInstance);

    expect(i18nInstance.use).toHaveBeenCalledWith(initReactI18next);
  });

  it('should use resourcesToBackend when resources are not provided', async () => {
    const i18nInstance = createInstance();

    await initTranslations(mockLocale, mockNamespaces, i18nInstance);

    expect(i18nInstance.use).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'backend',
        read: expect.any(Function),
      }),
    );
  });

  it('should handle errors during initialization', async () => {
    const i18nInstance = createInstance();
    i18nInstance.init = vi.fn().mockRejectedValue(new Error('Init failed'));

    await expect(
      initTranslations(mockLocale, mockNamespaces, i18nInstance),
    ).rejects.toThrow('Init failed');
  });
});
