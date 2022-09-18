import { render, screen } from '../../tests/test-utils';
import * as Auth from '../../contexts/AuthContext';

import userEvent from '@testing-library/user-event';

import { User } from '.';

type IAuthType = ReturnType<typeof Auth['useAuth']>;

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockAuthContext = jest.spyOn(Auth, 'useAuth');

const userExample = {
  displayName: 'John Doe',
};

describe('User Component', () => {
  it('should render the unauth button', () => {
    mockAuthContext.mockReturnValue({
      user: null,
    } as IAuthType);

    render(<User />);

    expect(screen.getByText('Login with Google')).toBeInTheDocument();
  });

  it('should render the auth button', () => {
    mockAuthContext.mockReturnValueOnce({
      user: userExample,
    } as IAuthType);

    render(<User />);

    expect(screen.getByText(userExample.displayName)).toBeInTheDocument();
  });

  it('should execute login', async () => {
    const handleSignIn = jest.fn();
    mockAuthContext.mockReturnValueOnce({
      handleSocialSignIn: handleSignIn as IAuthType['handleSocialSignIn'],
      user: null,
    } as IAuthType);

    const { rerender } = render(<User />);

    expect(screen.getByText('Login with Google')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('btn-login'));
    expect(handleSignIn).toHaveBeenCalled();

    mockAuthContext.mockReturnValueOnce({
      user: userExample,
    } as IAuthType);

    rerender(<User />);

    expect(screen.getByText(userExample.displayName)).toBeInTheDocument();
  });

  it('should execute logout', async () => {
    const handleSignOut = jest.fn();
    mockAuthContext.mockReturnValueOnce({
      handleSignOut: handleSignOut as IAuthType['handleSignOut'],
      user: userExample,
    } as IAuthType);

    const { rerender } = render(<User />);

    expect(screen.getByText(userExample.displayName)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('btn-logout'));
    expect(handleSignOut).toHaveBeenCalled();

    mockAuthContext.mockReturnValueOnce({
      user: null,
    } as IAuthType);

    rerender(<User />);

    expect(screen.getByText('Login with Google')).toBeInTheDocument();
  });

  it('should render with correct props', () => {
    mockAuthContext.mockReturnValueOnce({
      user: null,
    } as IAuthType);

    const { rerender } = render(<User />);

    expect(screen.getByTestId('wrapper-user')).toHaveStyle({
      display: 'none',
    });

    rerender(<User modeShow="mobile" />);

    expect(screen.getByTestId('wrapper-user')).toHaveStyle({
      display: 'flex',
    });
  });
});
