import {
  DEFAULT_GRAPHQL_QUERY,
  DEFAULT_GRAPHQL_URL,
} from '@/consts/defaultFormData';
import { renderHook } from '@testing-library/react';
import { Router } from 'next/router';
import { act } from 'react';
import { vi } from 'vitest';
import { mockGraphQLFormData } from '../../../../../../../__tests__/msw/mock';
import { useGraphQLForm } from './useGraphQLForm';

const mockPush = vi.fn();

vi.mock('next/navigation', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof Router;
  return {
    ...actual,
    useRouter: () => ({
      push: mockPush,
    }),
  };
});

describe('useGraphQLForm Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with the provided default values', () => {
    const { result } = renderHook(() => useGraphQLForm(mockGraphQLFormData));

    expect(result.current.getValues('url')).toBe(DEFAULT_GRAPHQL_URL);
  });

  it('should set the example form data when setExampleFormData is called', async () => {
    const { result } = renderHook(() => useGraphQLForm(null));

    await act(() => {
      result.current.setExampleFormData();
    });

    expect(result.current.getValues('url')).toBe(DEFAULT_GRAPHQL_URL);
    expect(result.current.getValues('query')).toBe(DEFAULT_GRAPHQL_QUERY);
  });

  it('should call router.push with serialized data when onSubmit is called', async () => {
    const { result } = renderHook(() => useGraphQLForm(mockGraphQLFormData));

    await act(async () => {
      await result.current.onSubmit(mockGraphQLFormData);
    });

    await act(async () => {
      await result.current.handleSubmit(() => {})();
    });

    expect(mockPush).toHaveBeenCalled();
  });

  it('should validate form data and set errors when invalid', async () => {
    const { result } = renderHook(() => useGraphQLForm(null));

    await act(() => {
      result.current.setValue('url', 'invalid-url');
    });

    await act(async () => {
      await result.current.handleSubmit(() => {})();
    });

    expect(result.current.errors.url).toBeTruthy();
  });
});
