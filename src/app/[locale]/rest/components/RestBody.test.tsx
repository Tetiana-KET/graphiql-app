import { render, screen, fireEvent } from '@testing-library/react';
import RestBody from '@/app/[locale]/rest/components/RestBody';
import { useRestBody } from '@/app/[locale]/rest/hooks/useRestBody';
import { vi, Mock } from 'vitest';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { RestFormData } from '@/models/RestFormData';

vi.mock('@/app/[locale]/rest/hooks/useRestBody');
vi.mock('react-i18next', () => ({
  useTranslation: vi.fn().mockReturnValue({ t: (key: string) => key }),
}));

vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: () => <div>CodeMirror Mock</div>,
}));

describe('RestBody', () => {
  const mockGetValues: UseFormGetValues<RestFormData> = vi
    .fn()
    .mockReturnValue('');
  const mockRegister: UseFormRegister<RestFormData> = vi.fn();
  const mockSetValue: UseFormSetValue<RestFormData> = vi.fn();
  const mockHandleValue = vi.fn();
  const mockPrettify = vi.fn();

  beforeEach(() => {
    (useRestBody as Mock).mockReturnValue({
      handleValue: mockHandleValue,
      prettify: mockPrettify,
    });
  });

  it('should render correctly', () => {
    render(
      <RestBody
        getValues={mockGetValues}
        register={mockRegister}
        setValue={mockSetValue}
        errorMessage=""
      />,
    );

    expect(screen.getByText('rest:body')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'common:prettifyCode' }),
    ).toBeInTheDocument();
  });

  it('should call prettify when the button is clicked', () => {
    render(
      <RestBody
        getValues={mockGetValues}
        register={mockRegister}
        setValue={mockSetValue}
        errorMessage=""
      />,
    );

    const button = screen.getByRole('button', { name: 'common:prettifyCode' });
    fireEvent.click(button);

    expect(mockPrettify).toHaveBeenCalled();
  });

  it('should display error message', () => {
    const errorMessage = 'Error occurred';
    render(
      <RestBody
        getValues={mockGetValues}
        register={mockRegister}
        setValue={mockSetValue}
        errorMessage={errorMessage}
      />,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
