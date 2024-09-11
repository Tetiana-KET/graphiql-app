import { render, screen } from '@testing-library/react';
import { useFetchUserName } from '@/hooks/useFetchUserName';
import UserGreeting from './UserGreeting';
import { mockUser } from '../../../../../__tests__/msw/mock';

vi.mock('@/hooks/useFetchUserName', () => ({
  useFetchUserName: vi.fn(),
}));

describe('UserGreeting component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Spinner when loading', () => {
    vi.mocked(useFetchUserName).mockReturnValue({
      name: '',
      loading: true,
      user: null,
    });
    render(<UserGreeting />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders Greeting when user is authorized', () => {
    vi.mocked(useFetchUserName).mockReturnValue({
      name: 'User Name',
      loading: false,
      user: mockUser,
    });

    render(<UserGreeting />);

    expect(screen.getByTestId('userGreeting')).toBeInTheDocument();
    expect(screen.getByTestId('userName')).toHaveTextContent('User Name');
  });

  it('renders Greeting for unauthorized user', () => {
    vi.mocked(useFetchUserName).mockReturnValue({
      name: '',
      loading: false,
      user: null,
    });

    render(<UserGreeting />);

    expect(screen.getByTestId('greeting')).toBeInTheDocument();
    expect(screen.getByTestId('greeting')).toHaveTextContent(
      'welcome:greeting',
    );
  });
});
