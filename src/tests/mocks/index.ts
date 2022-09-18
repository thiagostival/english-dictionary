export * from './contexts';
export * from './react-query';
export * from './global';

import {
  defaultAuth,
  defaultGlobal,
  IAuthType,
  IGlobalType,
  mockAuthContext,
  mockGlobalContext,
} from './contexts';
import {
  defaultInfiniteQuery,
  defaultQuery,
  IInfiniteQueryType,
  IQueryType,
  mockInfiniteQuery,
  mockQuery,
} from './react-query';

function restoreAllMocks() {
  mockQuery.mockRestore();
  mockInfiniteQuery.mockRestore();
  mockAuthContext.mockRestore();
  mockGlobalContext.mockRestore();

  mockQuery.mockReturnValue(defaultQuery as IQueryType);
  mockInfiniteQuery.mockReturnValue(defaultInfiniteQuery as IInfiniteQueryType);

  mockAuthContext.mockReturnValue(defaultAuth as IAuthType);
  mockGlobalContext.mockReturnValue(defaultGlobal as IGlobalType);
}

export { restoreAllMocks };
