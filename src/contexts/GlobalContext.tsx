import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { BroadcastChannel } from 'broadcast-channel';

// CONTEXT
import { useAuth } from './AuthContext';

// SERVICES
import { getWordUser, updateWordsUser } from '../services/endpoints';
import { IResponseGetWordsUser } from '../services/types';

// TYPES
type GlobalContextData = {
  updating: boolean;
  selectedWord: string;
  handleFavorite: (word: string) => void;
  handleSetSelectedWord: (word: string) => void;
  handleHistory: (param: { word: string; isAdd?: boolean }) => void;
  getSpecificWordUser: (
    word: string
  ) => Promise<IResponseGetWordsUser | undefined>;
};

type GlobalProviderProps = {
  children: ReactNode;
};

let refreshChanel = new BroadcastChannel('refresh');

export const GlobalContext = createContext({} as GlobalContextData);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();

  const { user } = useAuth();

  const [updating, setUpdating] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string>(() => {
    const urlWord = URLSearchParams.get('word');

    return urlWord || '';
  });

  const handleSetUrl = useCallback(
    (param: {}) => {
      SetURLSearchParams(param ? { ...param } : '');
    },
    [SetURLSearchParams]
  );

  const getSpecificWordUser = useCallback(
    async (word: string) => {
      try {
        if (!user?.email) return;

        const { apiCall: apiCallGet } = getWordUser();

        const { docs } = await apiCallGet({ email: user.email, word });
        const findWord = docs.map((d) => d?.data())?.[0] || undefined;

        return findWord;
      } catch (error) {
        return undefined;
      }
    },
    [user?.email]
  );

  const handleHistory = useCallback(
    async ({ word, isAdd = true }: { word: string; isAdd?: boolean }) => {
      try {
        if (!user?.email || !word) return;
        setUpdating(true);
        word = word?.toLowerCase();

        const { apiCall } = updateWordsUser();

        const findWord = await getSpecificWordUser(word);

        let isHistory = isAdd || !findWord?.isHistory;

        let newWord = {
          word,
          isFavorite: false,
          ...(findWord || {}),
          isHistory,
        };

        await apiCall({
          item: word,
          email: user.email,
          data: newWord,
        });

        setUpdating(false);
        refreshChanel.postMessage('updated-history');
      } catch (err) {
        // console.error(err);
      }
    },
    [getSpecificWordUser, user?.email]
  );

  const handleFavorite = useCallback(
    async (word: string) => {
      try {
        if (!user?.email) return;
        setUpdating(true);
        word = word?.toLowerCase();

        const { apiCall } = updateWordsUser();

        const findWord = await getSpecificWordUser(word);

        let isFavorite = !findWord?.isFavorite;
        let newWord = {
          word,
          isHistory: false,
          ...(findWord || {}),
          isFavorite,
        };

        await apiCall({
          item: word,
          email: user.email,
          data: newWord,
        });

        setUpdating(false);

        refreshChanel.postMessage('updated-favorite');
      } catch (err) {
        // console.error(err);
      }
    },
    [user?.email, getSpecificWordUser]
  );

  const handleSetSelectedWord = useCallback(
    (word: string) => {
      word = word?.toLowerCase();

      setSelectedWord(word);
      handleHistory({ word });

      if (word !== URLSearchParams.get('word')) {
        handleSetUrl(word ? { word } : '');
      }
    },
    [handleHistory, URLSearchParams, handleSetUrl]
  );

  return (
    <GlobalContext.Provider
      value={{
        updating,
        selectedWord,
        handleHistory,
        handleFavorite,
        getSpecificWordUser,
        handleSetSelectedWord,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobal() {
  return useContext(GlobalContext);
}
