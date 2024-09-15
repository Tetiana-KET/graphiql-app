import { screen } from '@testing-library/react';
import { Navbar } from '@nextui-org/react';
import {
  mockAuthContextValue,
  mockUnAuthContextValue,
} from '../../../../../../../__tests__/msw/mock';
import { renderWithAuth } from '../../../../../../../__tests__/testUtils';
import AuthButtons from './AuthButtons';

vi.mock('@/firebase', () => ({
  logout: vi.fn(),
}));

describe('AuthButtons', () => {
  it('renders signIn and signUp buttons when not logged in', () => {
    renderWithAuth({
      children: (
        <Navbar>
          <AuthButtons />
        </Navbar>
      ),
      authContextValue: mockUnAuthContextValue,
    });

    expect(screen.getByTestId('signIn')).toBeInTheDocument();
    expect(screen.getByTestId('signUp')).toBeInTheDocument();
    expect(screen.getByTestId('toMain')).toHaveClass('hidden');
    expect(screen.getByTestId('signOut')).toHaveClass('hidden');
  });

  it('renders toMain and signOut buttons when logged in', () => {
    renderWithAuth({
      children: (
        <Navbar>
          <AuthButtons />
        </Navbar>
      ),
      authContextValue: mockAuthContextValue,
    });
    expect(screen.getByTestId('signIn')).toHaveClass('hidden');
    expect(screen.getByTestId('signUp')).toHaveClass('hidden');
    expect(screen.getByTestId('toMain')).toBeInTheDocument();
    expect(screen.getByTestId('signOut')).toBeInTheDocument();
  });
});
