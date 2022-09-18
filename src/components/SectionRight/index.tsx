import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';
import { BroadcastChannel } from 'broadcast-channel';

// STYLES
import { Tab, TabContent, TabList, WrapperSectionRight } from './styles';

// COMPONENTS
import { User } from '../User';
import WordCard from './components/WordCard';
import { GridItems } from './components/GridItems';

// CONTEXT
import { useAuth } from '../../contexts/AuthContext';
import { useGlobal } from '../../contexts/GlobalContext';

// SERVICES
import { getWordsList, getWordsUser } from '../../services/endpoints';

// UTILS
import { useIntersectionObserver } from '../../utils/useIntersectionObserver';
import { Loading } from '../Loading';

// TYPES
type ITabs = 'Word List' | 'History' | 'Favorites';

let refreshChanel = new BroadcastChannel('refresh');

export function SectionRight() {
  const {
    updating,
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

  const divIntersectionRef = useRef(null);
  const pageLength = useRef(30);

  const handleChangeTab = useCallback((tab: ITabs) => {
    setTabSelected(tab);
  }, []);

  const getWords = async ({
    queryKey,
    pageParam = '',
  }: QueryFunctionContext<ITabs, any>) => {
    switch (queryKey[0]) {
      case 'Word List': {
        const { apiCall } = getWordsList();
        const getW = await apiCall({
          pageStart: pageParam,
          pageLength: pageLength.current,
        });

        return getW.docs.map((d) => Object.values(d.data())[0]);
      }

      default: {
        if (!user?.email) return [];

        const { apiCall } = getWordsUser();
        const response = await apiCall({ email: user.email });
        const getData = response.docs.map((d) => d.data());

        let array = [];
        if (queryKey[0] === 'Favorites') {
          array = getData.filter((d) => d.isFavorite);
        } else {
          array = getData.filter((d) => d.isHistory);
        }

        return array.map((d) => d.word);
      }
    }
  };

  const { data, isLoading, hasNextPage, isError, fetchNextPage, refetch } =
    useInfiniteQuery(tabSelected, getWords, {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      staleTime: 1000 * 5, // 5 seconds
      getPreviousPageParam: () => false,
      getNextPageParam: (lastPage) => {
        if (!lastPage.length || lastPage.length < pageLength.current) {
          return undefined;
        }

        return lastPage[lastPage.length - 1];
      },
      onError: () => {
        let message = {
          title: 'Failed to get word',
          description:
            'There was a problem in get words. Please try again later!',
        };

        setErrorMessage(message.description);
      },
    });

  // watcher that identifies if the user has scrolled to the end of the page, if so,
  // it triggers the next call to api.
  useIntersectionObserver({
    target: divIntersectionRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const dataList = useMemo(() => {
    if (!data) return [];

    return data.pages.reduce((acc, curr) => [...acc, ...curr]);
  }, [data]);

  useEffect(() => {
    refreshChanel.onmessage = (message) => {
      if (message.data.includes('updated')) {
        refetch();
      }
    };
  }, [refetch]);

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
        <GridItems
          name={tabSelected}
          isLoading={isLoading}
          isAuthenticated={!!user}
          isEmpty={!dataList.length}
          errorMessage={errorMessage}
          isNeedAuth={tabsAuthenticated.includes(tabSelected)}
        >
          {dataList.map((word, idx) => (
            <WordCard
              word={word}
              key={`${word}-${idx}`}
              isDisableBtns={updating}
              showGroupIcons={!!user && tabSelected !== 'Word List'}
              isSelected={word === selectedWord}
              isHistory={tabSelected === 'History'}
              isFavorited={tabSelected === 'Favorites'}
              handleHistory={handleHistory}
              handleFavorite={handleFavorite}
              handleClick={handleSetSelectedWord}
            />
          ))}
        </GridItems>

        {hasNextPage && !isError && (
          <div ref={divIntersectionRef}>
            <Loading />
          </div>
        )}
      </TabContent>
    </WrapperSectionRight>
  );
}
