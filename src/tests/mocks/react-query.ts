import Query from 'react-query';

// TYPES
type IQueryType = ReturnType<typeof Query['useQuery']>;
type IInfiniteQueryType = ReturnType<typeof Query['useInfiniteQuery']>;

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
  useInfiniteQuery: jest.fn(),
}));

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

const defaultInfiniteQuery = {
  data: undefined,
};
const mockInfiniteQuery = jest
  .spyOn(Query, 'useInfiniteQuery')
  .mockReturnValue(defaultInfiniteQuery as unknown as IInfiniteQueryType);
const infinityQueryExample = {
  data: {
    pages: [
      [
        'FALSE',
        'I',
        'a',
        'ability',
        'able',
        'about',
        'above',
        'abroad',
        'absence',
        'absent',
        'absolute',
        'accept',
        'accident',
        'accord',
        'account',
        'accuse',
        'accustom',
        'ache',
        'across',
        'act',
        'action',
        'active',
        'actor',
        'actress',
        'actual',
        'add',
        'address',
        'admire',
        'admission',
        'admit',
      ],
      [
        'adopt',
        'adoption',
        'advance',
        'advantage',
        'adventure',
        'advertise',
        'advice',
        'advise',
        'affair',
        'afford',
        'afraid',
        'after',
        'afternoon',
        'again',
        'against',
        'age',
        'agency',
        'agent',
        'ago',
        'agree',
        'agriculture',
        'ahead',
        'aim',
        'air',
        'airplane',
        'alike',
        'alive',
        'all',
        'allow',
        'allowance',
      ],
    ],
  },
  hasNextPage: true,
  isError: false,
  fetchNextPage: jest.fn(),
} as unknown as IInfiniteQueryType;

export {
  defaultQuery,
  defaultInfiniteQuery,
  //
  queryExample,
  infinityQueryExample,
  //
  mockQuery,
  mockInfiniteQuery,
};

export type { IQueryType, IInfiniteQueryType };
