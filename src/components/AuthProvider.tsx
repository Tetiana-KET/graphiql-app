'use client';

import { auth } from '@/firebase';
import { onIdTokenChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useEffect, useMemo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export interface AuthContextValue {
  isLoggedIn: boolean | null;
  loading: boolean;
  userName: string;
  user: User | null | undefined;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, loading, error] = useAuthState(auth);
  const userName = user?.displayName || 'Incognito';
  const isLoggedIn = Boolean(user);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router, user]);

  if (error) {
    console.error(error.message);
  }

  const value = useMemo(
    () => ({ isLoggedIn, loading, userName, user }),
    [isLoggedIn, loading, userName, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
