import { useCallback, useState, useMemo } from 'react';
import { getDocs } from 'firebase/firestore';
import { useQuery } from 'react-query';

// STYLES
import {
  ContentMessages,
  GridTemplate,
  Tab,
  TabContent,
  TabList,
  WrapperSectionRight,
} from './styles';

// COMPONENTS
import WordCard from './WordCard';
import { User } from '../User';
import { Loading } from '../Loading';

// CONTEXT
import { useAuth } from '../../contexts/AuthContext';
import { useGlobal } from '../../contexts/GlobalContext';

// SERVICES
import { AxiosError } from 'axios';
import { isAxiosError } from '../../services/api';
import { IErrorGetWord } from '../../services/types';
import { wordsCollectionRef } from '../../services/firebase';

// TYPES
type ITabs = 'Word List' | 'History' | 'Favorites';

export function SectionRight() {
  const {
    history,
    favorites,
    selectedWord,
    handleHistory,
    handleFavorite,
    handleSetSelectedWord,
  } = useGlobal();
  const { user } = useAuth();

  const tabs: ITabs[] = ['Word List', 'History', 'Favorites'];
  const tabsAuthenticated = ['History', 'Favorites'];

  const [tabSelected, setTabSelected] = useState<ITabs>(tabs[0]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeTab = useCallback((tab: ITabs) => {
    setTabSelected(tab);
  }, []);

  const getWords = async () => {
    const getWord = await getDocs(wordsCollectionRef);
    const wordL = getWord.docs.map((d) => Object.values(d.data()));

    const words = wordL[0] || [];

    return words.sort();
  };

  const { data: wordsList, isLoading } = useQuery('words', getWords, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    onError: (err: AxiosError<IErrorGetWord>) => {
      let message = {
        title: 'Failed to get word',
        description: 'There was a problem in get word. Please try again later!',
      };

      if (isAxiosError(err)) {
        message = {
          title: err?.response?.data?.title || message.title,
          description: err?.response?.data?.message || message.description,
        };

        setErrorMessage(message.description);
      }
    },
  });

  const dataList = useMemo(() => {
    switch (tabSelected) {
      case 'Word List':
        return wordsList;
      case 'Favorites':
        return favorites;
      case 'History':
        return history;

      default:
        return [];
    }
  }, [wordsList, favorites, history, tabSelected]);

  return (
    <WrapperSectionRight>
      <TabList>
        {tabs.map((tab, idx) => (
          <Tab
            key={`${tab}-${idx}`}
            isActive={tabSelected === tab}
            onClick={() => handleChangeTab(tab)}
          >
            {tab}
          </Tab>
        ))}

        <User />
      </TabList>

      <TabContent>
        {tabsAuthenticated.includes(tabSelected) && !user ? (
          <ContentMessages>
            Log in to save history and favorites
          </ContentMessages>
        ) : (
          <>
            {isLoading ? (
              <Loading size={50} />
            ) : (
              <GridTemplate>
                {errorMessage ? (
                  <ContentMessages className="error">
                    {errorMessage}
                  </ContentMessages>
                ) : (
                  <>
                    {!dataList?.length ? (
                      <ContentMessages className="empty">
                        <span>No data for now</span>
                      </ContentMessages>
                    ) : (
                      dataList.map((word, idx) => (
                        <WordCard
                          word={word}
                          key={`${word}-${idx}`}
                          showGroupIcons={!!user}
                          isSelected={word === selectedWord}
                          isHistory={tabSelected === 'History'}
                          isFavorited={favorites.includes(word)}
                          handleHistory={handleHistory}
                          handleFavorite={handleFavorite}
                          handleClick={handleSetSelectedWord}
                        />
                      ))
                    )}
                  </>
                )}
              </GridTemplate>
            )}
          </>
        )}
      </TabContent>
    </WrapperSectionRight>
  );
}
