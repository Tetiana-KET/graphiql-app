import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useAuthState } from 'react-firebase-hooks/auth';
import { onIdTokenChanged } from 'firebase/auth';
import { vi, Mock } from 'vitest';
import { AuthProvider } from './AuthProvider';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('notistack', () => ({
  enqueueSnackbar: vi.fn(),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  onIdTokenChanged: vi.fn(),
}));

vi.mock('@/firebase', () => ({
  auth: {},
}));

describe('AuthProvider', () => {
  const mockUseRouter = useRouter as Mock;
  const mockEnqueueSnackbar = enqueueSnackbar as Mock;
  const mockUseAuthState = useAuthState as Mock;
  const mockOnIdTokenChanged = onIdTokenChanged as Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: vi.fn() });
    mockUseAuthState.mockReturnValue([null, false, null]);
    mockOnIdTokenChanged.mockImplementation((_, callback) => {
      callback(null);
      return vi.fn();
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render children when user is not logged in', () => {
    render(
      <AuthProvider>
        <div data-testid="child">Child Component</div>
      </AuthProvider>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should render children when user is logged in', () => {
    mockUseAuthState.mockReturnValue([
      { displayName: 'John Doe' },
      false,
      null,
    ]);

    render(
      <AuthProvider>
        <div data-testid="child">Child Component</div>
      </AuthProvider>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should show error message when there is an error', () => {
    const error = new Error('Test Error');
    mockUseAuthState.mockReturnValue([null, false, error]);

    render(
      <AuthProvider>
        <div data-testid="child">Child Component</div>
      </AuthProvider>,
    );

    expect(mockEnqueueSnackbar).toHaveBeenCalledWith(error.message);
  });

  it('should redirect to home when user is not authenticated', () => {
    const mockPush = vi.fn();
    mockUseRouter.mockReturnValue({ push: mockPush });

    render(
      <AuthProvider>
        <div data-testid="child">Child Component</div>
      </AuthProvider>,
    );

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
