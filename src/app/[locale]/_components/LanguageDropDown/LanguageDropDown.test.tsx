import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
import LanguageDropDown from './LanguageDropDown';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

describe('LanguageDropDown', () => {
  const mockRouter = { push: vi.fn(), refresh: vi.fn() };
  const mockUseTranslation = { i18n: { language: 'en' } };

  beforeEach(() => {
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue(mockRouter);

    (useTranslation as ReturnType<typeof vi.fn>).mockReturnValue(
      mockUseTranslation,
    );

    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue('/current-page');

    document.cookie = '';
  });

  it('renders the current language', () => {
    render(<LanguageDropDown />);
    const dropdownTrigger = screen.getByTestId('dropdownTrigger');
    expect(dropdownTrigger).toHaveTextContent('English');
  });

  it('opens the dropdown and allows changing language', () => {
    render(<LanguageDropDown />);

    const dropdownTrigger = screen.getByTestId('dropdownTrigger');
    fireEvent.click(dropdownTrigger);

    const englishItem = screen.getByTestId('dropdownItem_en');
    const russianItem = screen.getByTestId('dropdownItem_ru');
    const chineseItem = screen.getByTestId('dropdownItem_zh');

    expect(englishItem).toBeInTheDocument();
    expect(russianItem).toBeInTheDocument();
    expect(chineseItem).toBeInTheDocument();
  });
});
