import { useHandleSignUp } from '@/hooks/useHandleSignUp';
import { registerWithEmailAndPassword } from '@/firebase';
import { checkErrorInstance } from '@/utils/checkErrorInstance';
import { Mock, vi } from 'vitest';
import { TFunction } from 'i18next';
import { renderHook } from '@testing-library/react';
import { act } from 'react';

vi.mock('@/firebase', () => ({
  registerWithEmailAndPassword: vi.fn(),
}));
vi.mock('@/utils/checkErrorInstance', () => ({
  checkErrorInstance: vi.fn(),
}));

describe('useHandleSignUp hook', () => {
  const t = vi.fn((key: string) => key) as unknown as TFunction<
    'translation',
    undefined
  >;

  beforeEach(() => {
    vi.clearAllMocks(); // Очищаем моки перед каждым тестом
  });

  it('should return initial values and validation state', () => {
    const { result } = renderHook(() => useHandleSignUp(t));

    expect(result.current.register).toBeInstanceOf(Function);
    expect(result.current.handleSubmit).toBeInstanceOf(Function);
    expect(result.current.onSubmit).toBeInstanceOf(Function);
    expect(result.current.errors).toEqual({});
    expect(result.current.isValid).toBe(false);
  });

  it('should call registerWithEmailAndPassword on form submission', async () => {
    const { result } = renderHook(() => useHandleSignUp(t));

    const mockData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'John Doe',
    };

    await act(async () => {
      await result.current.onSubmit(mockData);
    });

    expect(registerWithEmailAndPassword).toHaveBeenCalledWith(
      mockData.name,
      mockData.email,
      mockData.password,
    );
    expect(registerWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  it('should handle error during sign up and call checkErrorInstance', async () => {
    const { result } = renderHook(() => useHandleSignUp(t));
    const mockData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'John Doe',
    };

    const mockError = new Error('Sign up failed');
    (registerWithEmailAndPassword as Mock).mockRejectedValueOnce(mockError);

    await act(async () => {
      await result.current.onSubmit(mockData);
    });

    expect(checkErrorInstance).toHaveBeenCalledWith(mockError);
    expect(checkErrorInstance).toHaveBeenCalledTimes(1);
  });
});
