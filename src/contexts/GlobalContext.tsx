import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

// SERVICES
import { db } from '../services/firebase';

// CONTEXT
import { useAuth } from './AuthContext';

// TYPES
type GlobalContextData = {
  history: string[];
  favorites: string[];
  selectedWord: string;
  handleHistory: (word: string) => void;
  handleFavorite: (word: string) => void;
  handleSetSelectedWord: (word: string) => void;
};

type GlobalProviderProps = {
  children: ReactNode;
};

interface IData {
  id: string;
  words: string[];
}

export const GlobalContext = createContext({} as GlobalContextData);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();

  const { user } = useAuth();

  const [history, setHistory] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const [selectedWord, setSelectedWord] = useState<string>(() => {
    const urlWord = URLSearchParams.get('word');

    return urlWord || '';
  });

  function handleSetFavorite(words: string[]) {
    setFavorites(words);
  }

  function handleSetHistory(words: string[]) {
    setHistory(words);
  }

  const handleSetUrl = useCallback(
    (param: {}) => {
      SetURLSearchParams(param ? { ...param } : '');
    },
    [SetURLSearchParams]
  );

  const handleHistory = useCallback(
    async (word: string) => {
      try {
        if (!user?.email || !word) return;

        let newHis = [];
        if (!history.includes(word)) {
          newHis = [word, ...history];
        } else {
          newHis = history.filter((f) => f !== word);
        }

        await setDoc(
          doc(db, user?.email, 'history'),
          {
            words: newHis,
          },
          { merge: true }
        );

        handleSetHistory(newHis);
      } catch (err) {
        // console.error(err);
      }
    },
    [history, user?.email]
  );

  const handleFavorite = useCallback(
    async (word: string) => {
      try {
        if (!user?.email) return;

        let newFavs = [];
        if (!favorites.includes(word)) {
          newFavs = [word, ...favorites];
        } else {
          newFavs = favorites.filter((f) => f !== word);
        }

        await setDoc(
          doc(db, user?.email, 'favorites'),
          {
            words: newFavs,
          },
          { merge: true }
        );

        handleSetFavorite(newFavs);
      } catch (err) {
        // console.error(err);
      }
    },
    [favorites, user?.email]
  );

  const handleSetSelectedWord = useCallback(
    (word: string) => {
      setSelectedWord(word);
      handleHistory(word);

      if (word !== URLSearchParams.get('word')) {
        handleSetUrl({ word: word.toLowerCase() });
      }
    },
    [handleHistory, URLSearchParams, handleSetUrl]
  );

  const getDataUser = useCallback(async () => {
    if (!user?.email) return;

    const dataCollectionRef = collection(db, user?.email);
    const getData = await getDocs(dataCollectionRef);

    const data = getData.docs.map((d) => ({
      ...d.data(),
      id: d.id,
    })) as IData[];

    setFavorites(data.find((d) => d.id === 'favorites')?.words || []);
    setHistory(data.find((d) => d.id === 'history')?.words || []);
  }, [user?.email]);

  useEffect(() => {
    getDataUser();
  }, [getDataUser]);

  useEffect(() => {
    if (!user) {
      setHistory([]);
      setFavorites([]);
    }
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        history,
        favorites,
        selectedWord,
        handleHistory,
        handleFavorite,
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
