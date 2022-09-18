import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  Query,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore';

import { api, CancelToken } from './api';
import { db } from './firebase';

// TYPES
import {
  IGetWordsList,
  IGetWordsUser,
  IGetWordUser,
  IResponseGetWord,
  IResponseGetWordsUser,
  ISetWordsUser,
} from './types';

export function getWord() {
  const source = CancelToken.source();

  function apiCall(word: string) {
    return api.get<IResponseGetWord[]>(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      {
        cancelToken: source.token,
      }
    );
  }

  return { source, apiCall };
}

export function getWordsList() {
  function apiCall({
    direction = 'asc',
    pageStart = '',
    pageLength = 30,
  }: IGetWordsList) {
    const wordsCollectionRef = collection(db, 'list');

    return getDocs(
      query(
        wordsCollectionRef,
        orderBy('word', direction),
        startAfter(pageStart),
        limit(pageLength)
      )
    );
  }

  return { apiCall };
}

export function getWordsUser() {
  function apiCall({
    email,
    direction = 'asc',
    pageStart = '',
    pageLength = 30,
  }: IGetWordsUser) {
    const dataCollectionRef = collection(db, email);

    return getDocs(
      query(
        dataCollectionRef,
        orderBy('word', direction),
        startAfter(pageStart),
        limit(pageLength)
      ) as Query<IResponseGetWordsUser>
    );
  }

  return { apiCall };
}

export function getWordUser() {
  function apiCall({ email, word }: IGetWordUser) {
    const dataCollectionRef = collection(db, email);

    return getDocs(
      query(
        dataCollectionRef,
        where('word', '==', word)
      ) as Query<IResponseGetWordsUser>
    );
  }

  return { apiCall };
}

export function updateWordsUser() {
  function apiCall({ email, item, data }: ISetWordsUser) {
    return setDoc(doc(db, email, item), data, { merge: true });
  }

  return { apiCall };
}
