import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { redirect } from 'next/navigation';
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

    render(<SignUp />);

    expect(screen.getByTestId('signUpPage')).toBeInTheDocument();
    expect(screen.getByTestId('nameInput')).toBeInTheDocument();
    expect(screen.getByTestId('emailInput')).toBeInTheDocument();
    expect(screen.getByTestId('passwordInput')).toBeInTheDocument();
    expect(screen.getByTestId('submitBtn')).toBeInTheDocument();
    expect(screen.getByTestId('submitBtn')).toBeDisabled();
    expect(screen.getByTestId('signInWithGoogleBtn')).toBeInTheDocument();
    expect(screen.getByTestId('signInLink')).toBeInTheDocument();
  });

  it('should not redirect if not logged in', () => {
    render(<SignUp />);

    expect(redirect).not.toHaveBeenCalled();
  });
});
