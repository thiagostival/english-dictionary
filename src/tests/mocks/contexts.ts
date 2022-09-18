import * as Auth from '../../contexts/AuthContext';
import * as Global from '../../contexts/GlobalContext';

type IAuthType = ReturnType<typeof Auth['useAuth']>;
type IGlobalType = ReturnType<typeof Global['useGlobal']>;

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));
jest.mock('../../contexts/GlobalContext', () => ({
  useGlobal: jest.fn(),
}));

//! CONTEXT APIs
const defaultAuth = {
  user: null,
};
const mockAuthContext = jest
  .spyOn(Auth, 'useAuth')
  .mockReturnValue(defaultAuth as IAuthType);
const authExample = {
  user: { displayName: 'John Doe' },
};

const defaultGlobal = {
  selectedWord: '',
};
const mockGlobalContext = jest
  .spyOn(Global, 'useGlobal')
  .mockReturnValue(defaultGlobal as IGlobalType);
const globalExample = {
  selectedWord: 'hello',
};

export {
  defaultAuth,
  defaultGlobal,
  //
  authExample,
  globalExample,
  //
  mockAuthContext,
  mockGlobalContext,
};

export type { IAuthType, IGlobalType };
