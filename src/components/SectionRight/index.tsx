import { useCallback, useMemo, useState } from 'react';

import { CgTrash } from 'react-icons/cg';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';

// STYLES
import {
  GridTemplate,
  Tab,
  TabContent,
  TabList,
  WrapperButton,
  WrapperSectionRight,
  GroupIcons,
} from './styles';

// COMPONENTS
import { Button } from '../Button';
import { Loading } from '../Loading';

// CONTEXT
import { useGlobal } from '../../contexts/GlobalContext';

// TYPES
type ITabs = 'Word List' | 'History' | 'Favorites';

export function SectionRight() {
  const {
    loading,
    history,
    wordList,
    favorites,
    selectedWord,
    handleFavorite,
    handleRemoveHistory,
    handleSetSelectedWord,
  } = useGlobal();

  const tabs: ITabs[] = ['Word List', 'History', 'Favorites'];

  const [tabSelected, setTabSelected] = useState<ITabs>('Word List');

  const dataList = useMemo(() => {
    switch (tabSelected) {
      case 'Word List':
        return wordList;
      case 'History':
        return history;
      case 'Favorites':
        return favorites;
      default:
        return [];
    }
  }, [favorites, history, tabSelected, wordList]);

  const handleChangeTab = useCallback((tab: ITabs) => {
    setTabSelected(tab);
  }, []);

  return (
    <WrapperSectionRight isDisabled={!!selectedWord}>
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
      </TabList>

      <TabContent>
        {loading ? (
          <Loading size={50} />
        ) : (
          <GridTemplate>
            {dataList.map((word, idx) => (
              <WrapperButton
                key={`${word}-${idx}`}
                isActive={word === selectedWord}
              >
                <Button
                  variant="unstyled"
                  onClick={() => handleSetSelectedWord(word)}
                >
                  {word}
                </Button>

                <GroupIcons>
                  {favorites.includes(word) ? (
                    <MdOutlineFavorite onClick={() => handleFavorite(word)} />
                  ) : (
                    <MdOutlineFavoriteBorder
                      onClick={() => handleFavorite(word)}
                    />
                  )}

                  {tabSelected === 'History' && (
                    <CgTrash onClick={() => handleRemoveHistory(word)} />
                  )}
                </GroupIcons>
              </WrapperButton>
            ))}
          </GridTemplate>
        )}
      </TabContent>
    </WrapperSectionRight>
  );
}
