import { BaseFormData } from '@/models/BaseFormData';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { Control } from 'react-hook-form';
import { vi } from 'vitest';
import { useRequestKeyValuePairs } from './useRequestKeyValuePairs';

const mockType = 'variables';
const mockControl = {
  _subjects: {},
  _removeUnmounted: vi.fn(),
  _names: {},
  _state: {},
} as unknown as Control<BaseFormData>;

const appendMock = vi.fn();
const removeMock = vi.fn();

vi.mock('react-hook-form', () => ({
  useFieldArray: () => ({
    field: vi.fn(),
    append: appendMock,
    remove: removeMock,
  }),
}));

describe('useRequestKeyValuePairs Hook', () => {
  it('should add field on the call of related function', () => {
    const { result } = renderHook(() =>
      useRequestKeyValuePairs({ type: mockType, control: mockControl }),
    );

    act(() => {
      result.current.addField();
    });
    expect(appendMock).toBeCalledWith({ key: '', value: '' });
  });

  it('should remove field on the call of related function', () => {
    const { result } = renderHook(() =>
      useRequestKeyValuePairs({ type: mockType, control: mockControl }),
    );

    act(() => {
      result.current.removeField(1);
    });
    expect(removeMock).toBeCalled();
  });
});
