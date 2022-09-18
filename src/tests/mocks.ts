import Query from 'react-query';
import * as Auth from '../contexts/AuthContext';
import * as Global from '../contexts/GlobalContext';

// TYPES
type IQueryType = ReturnType<typeof Query['useQuery']>;
type IAuthType = ReturnType<typeof Auth['useAuth']>;
type IGlobalType = ReturnType<typeof Global['useGlobal']>;

jest.mock('broadcast-channel');
jest.mock('../services/firebase', () => {});
jest.mock('../services/endpoints', () => {});

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));
jest.mock('../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));
jest.mock('../contexts/GlobalContext', () => ({
  useGlobal: jest.fn(),
}));

const defaultAuth = {
  user: null,
};
const mockAuthContext = jest
  .spyOn(Auth, 'useAuth')
  .mockReturnValue(defaultAuth as IAuthType);
const authExample = {
  user: { displayName: 'John Doe' },
};

const defaultQuery = {
  data: undefined,
};
const mockQuery = jest
  .spyOn(Query, 'useQuery')
  .mockReturnValue(defaultQuery as IQueryType);
const queryExample = {
  data: {
    word: 'hello',
    phonetics: {
      text: '/həˈləʊ/',
      audio:
        'https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3',
    },
    meanings: [
      {
        partOfSpeech: 'noun',
        definitions: [
          {
            definition: '"Hello!" or an equivalent greeting.',
          },
        ],
      },
    ],
  },
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

const mockAudio = {
  pause: jest.fn(),
  play: jest.fn(),
};

HTMLMediaElement.prototype.play = mockAudio.play;
HTMLMediaElement.prototype.pause = mockAudio.pause;

const mockClipboard = {
  writeText: jest.fn(),
};
Object.assign(navigator, {
  clipboard: mockClipboard,
});

function restoreAllMocks() {
  mockQuery.mockRestore();
  mockAuthContext.mockRestore();
  mockGlobalContext.mockRestore();

  mockQuery.mockReturnValue(defaultQuery as IQueryType);
  mockAuthContext.mockReturnValue(defaultAuth as IAuthType);
  mockGlobalContext.mockReturnValue(defaultGlobal as IGlobalType);
}

export {
  mockAudio,
  mockClipboard,
  mockQuery,
  mockAuthContext,
  mockGlobalContext,
  defaultAuth,
  authExample,
  queryExample,
  defaultQuery,
  globalExample,
  defaultGlobal,
  restoreAllMocks,
};

export type { IQueryType, IAuthType, IGlobalType };
