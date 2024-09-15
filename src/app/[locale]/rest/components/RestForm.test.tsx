import { fireEvent, render, screen } from '@testing-library/react';
import RestForm from '@/app/[locale]/rest/components/RestForm';
import { Mock, vi } from 'vitest';
import { useForm } from 'react-hook-form';
import { RestFormData } from '@/models/RestFormData';
import { SerializerService } from '@/services/serializer';
import { RequestType } from '@/enums/RequestType';
import {
  DEFAULT_REST_BODY,
  DEFAULT_REST_METHOD,
  DEFAULT_REST_URL,
  DEFAULT_REST_VARIABLES,
} from '@/consts/defaultFormData';
import { RestMethod } from '@/enums/RestMethod';
import { useRouter } from 'next/navigation';

vi.mock('react-hook-form', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-hook-form')>();

  return {
    ...actual,
    useForm: vi.fn(),
    useFieldArray: () => ({
      fields: [{ key: 'id', value: '2' }],
      append: vi.fn(),
      remove: vi.fn(),
    }),
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn().mockReturnValue({ t: (key: string) => key }),
}));

vi.mock('@/utils/checkErrorInstance');

vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: () => <div>CodeMirror Mock</div>,
}));

describe('RestForm', () => {
  const mockHandleSubmit = vi.fn((fn) => fn);
  const mockSetValue = vi.fn();
  const mockGetValues = vi.fn();
  const mockWatch = vi.fn();
  const mockRegister = vi.fn();
  const mockControl = vi.fn();
  const mockPush = vi.fn();
  let mockErrors = {};

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({ push: mockPush });
    (useForm as Mock).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      control: mockControl,
      getValues: mockGetValues,
      setValue: mockSetValue,
      watch: mockWatch,
      formState: { errors: mockErrors },
    });
  });

  it('should render correctly', () => {
    render(<RestForm formData={null} />);

    expect(screen.getByText('common:FillExampleData')).toBeInTheDocument();
    expect(screen.getByText('common:Send')).toBeInTheDocument();
  });

  it('should call onSubmit with correct data', () => {
    const mockData: RestFormData = {
      method: RestMethod.Get,
      url: 'http://example.com',
      headers: [],
      variables: [],
      body: '',
    };

    mockHandleSubmit.mockImplementation((fn) => fn(mockData));

    render(<RestForm formData={mockData} />);

    const submitButton = screen.getByRole('button', { name: 'common:Send' });
    fireEvent.click(submitButton);

    expect(mockPush).toHaveBeenCalledWith(
      SerializerService.serialize(RequestType.Rest, mockData),
    );
  });

  it('should set example form data when button is clicked', () => {
    render(<RestForm formData={null} />);

    const exampleButton = screen.getByRole('button', {
      name: 'common:FillExampleData',
    });
    fireEvent.click(exampleButton);

    expect(mockSetValue).toHaveBeenCalledWith('method', DEFAULT_REST_METHOD);
    expect(mockSetValue).toHaveBeenCalledWith('url', DEFAULT_REST_URL);
    expect(mockSetValue).toHaveBeenCalledWith(
      'variables',
      DEFAULT_REST_VARIABLES,
    );
    expect(mockSetValue).toHaveBeenCalledWith('body', DEFAULT_REST_BODY);
  });

  it('should display error messages', () => {
    mockErrors = {
      method: { message: 'Method is required' },
      url: { message: 'URL is required' },
      body: { message: 'Body is required' },
    };

    (useForm as Mock).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      control: mockControl,
      getValues: mockGetValues,
      setValue: mockSetValue,
      watch: mockWatch,
      formState: { errors: mockErrors },
    });

    render(<RestForm formData={null} />);

    expect(screen.getByText('Method is required')).toBeInTheDocument();
    expect(screen.getByText('URL is required')).toBeInTheDocument();
    expect(screen.getByText('Body is required')).toBeInTheDocument();
  });
});
