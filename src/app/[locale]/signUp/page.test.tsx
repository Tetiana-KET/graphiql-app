import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import SignUp from './page';

interface HandleSubmitFn {
  (cb: () => void): () => void;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  loading: boolean;
}

vi.mock('@/firebase', () => ({
  signInWithGoogle: vi.fn(),
}));

vi.mock('@/hooks/useHandleSignUp', () => ({
  useHandleSignUp: () => ({
    register: vi.fn(),
    handleSubmit: ((cb: () => void) => cb) as HandleSubmitFn,
    onSubmit: vi.fn(),
    errors: {},
    isValid: true,
  }),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@/components/AuthProvider', () => ({
  AuthContext: {
    Consumer: ({
      children,
    }: {
      children: (value: AuthContextValue) => React.ReactNode;
    }) => children({ isLoggedIn: false, loading: false }),
  },
}));

describe('SignUp Component', () => {
  it('should render SignUp', () => {
    render(<SignUp />);
    screen.debug();

    expect(screen.getByTestId('signUpPage')).toBeInTheDocument();
  });

  // TODO: finish testing
});
