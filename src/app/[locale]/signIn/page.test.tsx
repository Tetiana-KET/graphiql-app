import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { redirect } from 'next/navigation';
import SignIn from './page';

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

vi.mock('@/hooks/useHandleSignIn', () => ({
  useHandleSignIn: () => ({
    register: vi.fn(),
    handleSubmit: ((cb: () => void) => cb) as HandleSubmitFn,
    onSubmit: vi.fn(),
    errors: {},
    isValid: false,
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

describe('SignUp Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render SignUp with correct content', () => {
    vi.mock('@/components/AuthProvider', () => ({
      AuthContext: {
        Consumer: ({
          children,
        }: {
          children: (value: AuthContextValue) => React.ReactNode;
        }) => children({ isLoggedIn: false, loading: false }),
      },
    }));

    render(<SignIn />);

    expect(screen.getByTestId('signInPage')).toBeInTheDocument();
    expect(screen.getByTestId('loginTextBox')).toBeInTheDocument();
    expect(screen.getByTestId('loginPass')).toBeInTheDocument();
    expect(screen.getByTestId('loginBtn')).toBeInTheDocument();
    expect(screen.getByTestId('loginBtn')).toBeDisabled();
    expect(screen.getByTestId('signInWithGoogle')).toBeInTheDocument();
    expect(screen.getByTestId('signInLink')).toBeInTheDocument();
  });

  it('should not redirect if not logged in', () => {
    render(<SignIn />);

    expect(redirect).not.toHaveBeenCalled();
  });
});
