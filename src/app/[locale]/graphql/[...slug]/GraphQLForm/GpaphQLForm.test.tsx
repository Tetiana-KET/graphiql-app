import { DEFAULT_GRAPHQL_URL } from '@/consts/defaultFormData';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'next/router';
import { describe, expect, it, vi } from 'vitest';
import { GraphQLFormDataMock } from '../../../../../../__tests__/msw/mock';
import { GraphQLForm } from './GraphQLForm';

const handleSubmitMock = vi.fn();
vi.mock('./hooks/useGraphQLForm', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('./hooks/useGraphQLForm')>();

  return {
    ...actual,
    useGraphQLForm: () => ({
      setExampleFormData: vi.fn(),
      getValues: vi.fn(),
      register: vi.fn(),
      control: vi.fn(),
      watch: vi.fn(),
      setValue: vi.fn(),
      handleSubmit: handleSubmitMock,
      errors: {},
      onSubmit: vi.fn(),
    }),
  };
});

vi.mock('./hooks/useSDLAsURL', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./hooks/useSDLAsURL')>();

  return {
    ...actual,
    useSDLAsURL: () => ({
      URLValue: DEFAULT_GRAPHQL_URL,
    }),
  };
});

vi.mock('react-hook-form', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-hook-form')>();

  return {
    ...actual,
    useFieldArray: () => ({
      fields: [{ key: 'id', value: '2' }],
      append: vi.fn(),
      remove: vi.fn(),
    }),
  };
});

vi.mock('next/navigation', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof Router;
  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn(),
    }),
  };
});

vi.mock('./components/CodeMirror/CodeMirrorBoard', () => ({
  __esModule: true,
  default: () => <div>CodeMirror Mock</div>,
}));

describe('GraphQLForm', () => {
  it('GraphQLForm is rendering as it expected', () => {
    render(<GraphQLForm formData={GraphQLFormDataMock} />);
    const urlInput = screen.getByDisplayValue(DEFAULT_GRAPHQL_URL);
    expect(urlInput).toBeTruthy();
  });

  it('Submit process is starts on click to the send button', () => {
    render(<GraphQLForm formData={GraphQLFormDataMock} />);
    const sendButton = screen.getByTestId('send-button');
    fireEvent.click(sendButton);
    expect(handleSubmitMock).toBeCalled();
  });
});
