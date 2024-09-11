import { RequestType } from '@/enums/RequestType';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { vi } from 'vitest';
import {
  mockDocumentationResponse,
  mockGraphQLFormData,
  mockGraphQLRequestHistoryRecord,
} from '../../__tests__/msw/mock';
import { useHistory } from './useHistory';

const mockGetItem = () => JSON.stringify([mockGraphQLRequestHistoryRecord]);
const mockSetItem = vi.fn();
const mockRemoveItem = vi.fn();
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: () => mockGetItem(),
    setItem: mockSetItem,
    removeItem: mockRemoveItem,
  },
});

describe('useHistory Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Get method should return value from local storage', () => {
    const { result } = renderHook(() => useHistory());
    expect(result.current.get()).toStrictEqual([
      mockGraphQLRequestHistoryRecord,
    ]);
  });

  it('Add method should set history', async () => {
    const { result } = renderHook(() => useHistory());
    await act(() =>
      result.current.add(
        RequestType.GraphQL,
        mockGraphQLFormData,
        mockDocumentationResponse,
      ),
    );
    expect(mockSetItem).toBeCalled();
  });

  it('Clear method should remove history', async () => {
    const { result } = renderHook(() => useHistory());
    await act(() => result.current.clear());
    expect(mockRemoveItem).toBeCalledWith('history');
  });
});
