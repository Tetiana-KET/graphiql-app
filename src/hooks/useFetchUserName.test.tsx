import { useFetchUserName } from '@/hooks/useFetchUserName';
import { AuthContext } from '@/components/AuthProvider';
import { getDocs } from 'firebase/firestore';
import { checkErrorInstance } from '@/utils/checkErrorInstance';
import { Mock, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act, ReactNode } from 'react';
import { User, UserMetadata } from 'firebase/auth';

vi.mock('firebase/firestore', () => {
  const originalModule = vi.importActual('firebase/firestore');
  return {
    ...originalModule,
    collection: vi.fn(),
    getDocs: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    getFirestore: vi.fn(),
  };
});

vi.mock('@/utils/checkErrorInstance', () => ({
  checkErrorInstance: vi.fn(),
}));

const mockUser: User = {
  uid: '123',
  displayName: 'John Doe',
  email: 'john.doe@example.com',
  emailVerified: true,
  phoneNumber: null,
  photoURL: null,
  providerId: 'firebase',
  refreshToken: '',
  tenantId: null,
  delete: vi.fn(),
  getIdToken: vi.fn(),
  getIdTokenResult: vi.fn(),
  reload: vi.fn(),
  toJSON: vi.fn(),
  isAnonymous: false,
  metadata: {} as UserMetadata,
  providerData: [],
};

type WrapperProps = {
  children: ReactNode;
};

describe('useFetchUserName', () => {
  it('should initialize with default values', () => {
    const wrapper = ({ children }: WrapperProps) => (
      <AuthContext.Provider
        value={{ user: null, loading: true, isLoggedIn: false, userName: '' }}
      >
        {children}
      </AuthContext.Provider>
    );
    const { result } = renderHook(() => useFetchUserName(), { wrapper });

    expect(result.current.name).toBe('');
    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBeNull();
  });

  it('should fetch user name and update state', async () => {
    const mockData = { name: 'John Doe' };
    (getDocs as Mock).mockResolvedValueOnce({
      docs: [{ data: () => mockData }],
    });

    const wrapper = ({ children }: WrapperProps) => (
      <AuthContext.Provider
        value={{
          user: mockUser,
          loading: false,
          isLoggedIn: true,
          userName: 'John Doe',
        }}
      >
        {children}
      </AuthContext.Provider>
    );
    const { result, rerender } = renderHook(() => useFetchUserName(), {
      wrapper,
    });

    await act(async () => rerender());

    expect(result.current.name).toBe('John Doe');
  });

  it('should handle errors and set name to Incognito', async () => {
    const mockError = new Error('Test error');
    (getDocs as Mock).mockRejectedValueOnce(mockError);

    const wrapper = ({ children }: WrapperProps) => (
      <AuthContext.Provider
        value={{
          user: mockUser,
          loading: false,
          isLoggedIn: true,
          userName: 'John Doe',
        }}
      >
        {children}
      </AuthContext.Provider>
    );
    const { result, rerender } = renderHook(() => useFetchUserName(), {
      wrapper,
    });

    await act(async () => rerender());

    expect(checkErrorInstance).toHaveBeenCalledWith(mockError);
    expect(result.current.name).toBe('Incognito');
  });
});
