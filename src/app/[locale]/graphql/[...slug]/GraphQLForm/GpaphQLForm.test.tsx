import { render, screen } from '@testing-library/react';
import { Router } from 'next/router';
import { describe, expect, it, vi } from 'vitest';
import { GraphQLFormDataMock } from '../../../../../../__tests__/msw/mock';
import { GraphQLForm } from './GraphQLForm';

vi.mock('next/navigation', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof Router;
  return {
    ...actual,
    useGraphQLForm: {
      setExampleFormData: vi.fn(),
      getValues: vi.fn(),
      register: vi.fn(),
      control: vi.fn(),
      watch: vi.fn(),
      setValue: vi.fn(),
      handleSubmit: vi.fn(),
      errors: {},
      onSubmit: vi.fn(),
    },
    useSDLAsURL: {
      watch: vi.fn(),
      setValue: vi.fn(),
    },
    useRouter: vi.fn(),
  };
});

vi.mock('./components/CodeMirror/CodeMirrorBoard', () => ({
  __esModule: true,
  default: () => <div>CodeMirror Mock</div>,
}));

describe('GraphQLForm', () => {
  it('GraphQLForm is rendering as it expected', () => {
    render(<GraphQLForm formData={GraphQLFormDataMock} />);
    const urlInput = screen.getByText('URL');
    expect(urlInput).toBeTruthy();
  });
});
