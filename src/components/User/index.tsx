import { FcGoogle } from 'react-icons/fc';
import { MdLogout } from 'react-icons/md';

// STYLES
import { BtnLogin, configWrapper, DataUser, WrapperSignIn } from './styles';

// COMPONENTS
import { Avatar } from '../Avatar';

// CONTEXT
import { useAuth } from '../../contexts/AuthContext';

interface IUserProps {
  /**
   * @description responsive mode in which the component should behave
   *
   * @default web
   *
   * @example none
   * - In this mode the component is always rendered
   * @example mobile
   * - In this mode the component is rendered only on screens smaller than the breakpoint md
   * @example web
   * - In this mode the component is rendered only on screens larger than the breakpoint md
   */
  modeShow?: keyof typeof configWrapper;
}

export function User({ modeShow = 'web' }: IUserProps) {
  const { user, handleSignOut, handleSocialSignIn } = useAuth();

  return (
    <WrapperSignIn modeShow={modeShow}>
      {!user && (
        <BtnLogin onClick={handleSocialSignIn}>
          <FcGoogle />
          <span>Login with Google</span>
        </BtnLogin>
      )}

      {!!user && (
        <DataUser>
          <Avatar src={user.photoURL || ''} />
          <span>{user.displayName}</span>
          <MdLogout size="20" onClick={handleSignOut} />
        </DataUser>
      )}
    </WrapperSignIn>
  );
}
