import { useHandleSignIn } from '@/hooks/useHandleSignIn';
import { logInWithEmailAndPassword } from '@/firebase';
import { checkErrorInstance } from '@/utils/checkErrorInstance';
import { Mock, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { TFunction } from 'i18next';

vi.mock('@/firebase', () => ({
  logInWithEmailAndPassword: vi.fn(),
}));

vi.mock('@/utils/checkErrorInstance', () => ({
  checkErrorInstance: vi.fn(),
}));

describe('useHandleSignIn hook', () => {
  const t = vi.fn((key: string) => key) as unknown as TFunction<
    'translation',
    undefined
  >;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return initial values and validation state', () => {
    const { result } = renderHook(() => useHandleSignIn(t));

    expect(result.current.register).toBeInstanceOf(Function);
    expect(result.current.handleSubmit).toBeInstanceOf(Function);
    expect(result.current.onSubmit).toBeInstanceOf(Function);
    expect(result.current.errors).toEqual({});
    expect(result.current.isValid).toBe(false);
  });

  it('should call logInWithEmailAndPassword on form submission', async () => {
    const { result } = renderHook(() => useHandleSignIn(t));

    const mockData = { email: 'test@example.com', password: 'password123' };

    await act(async () => {
      await result.current.onSubmit(mockData);
    });

    expect(logInWithEmailAndPassword).toHaveBeenCalledWith(
      mockData.email,
      mockData.password,
    );
    expect(logInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  it('should handle error during sign in and call checkErrorInstance', async () => {
    const { result } = renderHook(() => useHandleSignIn(t));
    const mockData = { email: 'test@example.com', password: 'password123' };

    const mockError = new Error('Sign in failed');
    (logInWithEmailAndPassword as Mock).mockRejectedValueOnce(mockError);

    await act(async () => {
      await result.current.onSubmit(mockData);
    });

    expect(checkErrorInstance).toHaveBeenCalledWith(mockError);
    expect(checkErrorInstance).toHaveBeenCalledTimes(1);
  });
});
