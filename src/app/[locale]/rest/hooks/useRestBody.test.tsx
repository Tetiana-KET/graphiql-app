import { useRestBody } from '@/app/[locale]/rest/hooks/useRestBody';
import { prettifyCode } from '@/utils/prettifyCode';
import { UseFormSetValue } from 'react-hook-form';
import { RestFormData } from '@/models/RestFormData';
import { describe, expect, it, vi, Mock } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';

vi.mock('@/utils/prettifyCode');

describe('useRestBody', () => {
  const setValue: UseFormSetValue<RestFormData> = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update body and call setValue on handleValue', () => {
    const { result } = renderHook(() => useRestBody({ setValue }));
    const newValue = 'new body value';

    act(() => {
      result.current.handleValue(newValue);
    });

    expect(setValue).toHaveBeenCalledWith('body', newValue);
  });

  it('should prettify code and call setValue on prettify', () => {
    const { result } = renderHook(() => useRestBody({ setValue }));
    const initialBody = '{"key": "value"}';
    const prettifiedBody = '{\n  "key": "value"\n}';
    (prettifyCode as Mock).mockReturnValue(prettifiedBody);

    act(() => {
      result.current.handleValue(initialBody);
    });

    act(() => {
      result.current.prettify();
    });

    expect(setValue).toHaveBeenCalledWith('body', prettifiedBody);
  });

  it('should handle errors in prettify', () => {
    const { result } = renderHook(() => useRestBody({ setValue }));
    const initialBody = '{"key": "value"}';
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (prettifyCode as Mock).mockImplementation(() => {
      throw new Error('Prettify error');
    });

    act(() => {
      result.current.handleValue(initialBody);
    });

    act(() => {
      result.current.prettify();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to prettify the code:',
      expect.any(Error),
    );
    consoleErrorSpy.mockRestore();
  });
});
