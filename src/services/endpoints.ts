import { api, CancelToken } from './api';

// TYPES
import { IGetWord } from './types';

export function getWord() {
  const source = CancelToken.source();

  function apiCall(word: string) {
    return api.get<IGetWord[]>(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      {
        cancelToken: source.token,
      }
    );
  }

  return { source, apiCall };
}
