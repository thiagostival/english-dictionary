import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

// TYPES
type GlobalContextData = {
  loading: boolean;
  wordList: string[];
  history: string[];
  favorites: string[];
  selectedWord: string;
  handleFavorite: (word: string) => void;
  handleAddHistory: (word: string) => void;
  handleRemoveHistory: (word: string) => void;
  handleSetWordList: (words: string[]) => void;
  handleSetSelectedWord: (word: string) => void;
};

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalContext = createContext({} as GlobalContextData);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();

  const [history, setHistory] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const [wordList, setWordList] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string>(() => {
    const urlWord = URLSearchParams.get('word');

    return urlWord || '';
  });

  const [loading, setLoading] = useState(true);

  function handleAddHistory(word: string) {
    setHistory((oldValue) => {
      if (!oldValue.includes(word) && word) {
        return [word, ...oldValue];
      }
      return oldValue;
    });
  }
  function handleRemoveHistory(word: string) {
    setHistory((oldValue) => oldValue.filter((item) => item !== word));
  }

  function handleFavorite(word: string) {
    setFavorites((oldValue) => {
      if (!oldValue.includes(word)) {
        return [...oldValue, word];
      }

      return oldValue.filter((item) => item !== word);
    });
  }

  const handleSetWordList = useCallback((words: string[]) => {
    setWordList(words);
  }, []);

  const handleSetSelectedWord = useCallback(
    (word: string) => {
      setSelectedWord(word);
      handleAddHistory(word);

      if (word !== URLSearchParams.get('word')) {
        SetURLSearchParams(word ? { word } : '');
      }
    },
    [SetURLSearchParams, URLSearchParams]
  );

  const handleGetList = useCallback(async () => {
    try {
      handleSetWordList([]);

      setLoading(false);
    } catch (error) {
      // let message = {
      //   title: 'Failed to get words list',
      //   description:
      //     'There was a problem in get words. Please try again later!',
      // };
      setLoading(false);
    }
  }, [handleSetWordList]);

  useEffect(() => {
    handleGetList();
  }, [handleGetList]);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        history,
        wordList,
        favorites,
        selectedWord,
        handleFavorite,
        handleAddHistory,
        handleRemoveHistory,
        handleSetWordList,
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
