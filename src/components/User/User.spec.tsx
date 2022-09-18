import { render, screen } from '../../tests/test-utils';

import userEvent from '@testing-library/user-event';

import { User } from '.';

// MOCKs
import {
  IAuthType,
  mockAuthContext,
  authExample,
  restoreAllMocks,
} from '../../tests/mocks';

beforeAll(() => {
  restoreAllMocks();
});

describe('User Component', () => {
  it('should render the unauth button', () => {
    render(<User />);

    expect(screen.getByText('Login with Google')).toBeInTheDocument();
  });

  it('should render the auth button', () => {
    mockAuthContext.mockReturnValueOnce(authExample as IAuthType);

    render(<User />);

    expect(screen.getByText(authExample.user.displayName)).toBeInTheDocument();
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

    mockAuthContext.mockReturnValueOnce(authExample as IAuthType);

    rerender(<User />);

    expect(screen.getByText(authExample.user.displayName)).toBeInTheDocument();
  });

  it('should execute logout', async () => {
    const handleSignOut = jest.fn();
    mockAuthContext.mockReturnValueOnce({
      ...authExample,
      handleSignOut: handleSignOut as IAuthType['handleSignOut'],
    } as IAuthType);

    const { rerender } = render(<User />);

    expect(screen.getByText(authExample.user.displayName)).toBeInTheDocument();

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

afterAll(() => {
  restoreAllMocks();
});
