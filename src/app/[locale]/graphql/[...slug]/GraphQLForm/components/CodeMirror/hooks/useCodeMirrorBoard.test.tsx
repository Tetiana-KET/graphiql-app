import { DEFAULT_GRAPHQL_QUERY } from '@/consts/defaultFormData';
import { GraphQLFormData } from '@/models/GraphQLFormData';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { vi } from 'vitest';
import { useCodeMirrorBoard } from './useCodeMirrorBoard';

const mockSetValue: UseFormSetValue<GraphQLFormData> = vi.fn();

describe('useCodeMirrorBoard Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize code mirror board with the provided values', () => {
    const { result } = renderHook(() =>
      useCodeMirrorBoard({ setValue: mockSetValue }),
    );

    act(() => {
      result.current.handleBoardValue(DEFAULT_GRAPHQL_QUERY);
    });

    expect(result.current.query).toBe(DEFAULT_GRAPHQL_QUERY);
  });

  it('should prettify and set new value on related call', () => {
    const { result } = renderHook(() =>
      useCodeMirrorBoard({ setValue: mockSetValue }),
    );

    act(() => {
      result.current.prettify();
    });

    expect(mockSetValue).toBeCalled();
  });
});
