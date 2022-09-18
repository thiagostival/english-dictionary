import { memo, forwardRef } from 'react';

import { CgTrash } from 'react-icons/cg';
import { MdOutlineFavorite } from 'react-icons/md';

// STYLES
import { GroupIcons, WrapperWordCard } from './styles';

// COMPONENTS
import { Button } from '../../../Button';

// TYPES
interface IWordCardProps {
  word: string;
  isHistory?: boolean;
  isSelected?: boolean;
  isFavorited?: boolean;
  isDisableBtns?: boolean;
  showGroupIcons?: boolean;
  handleClick?: (word: string) => void;
  handleFavorite?: (word: string) => void;
  handleHistory?: (param: { word: string; isAdd?: boolean }) => void;
}

const WordCard = forwardRef<HTMLDivElement, IWordCardProps>(
  (
    {
      word,
      isHistory = false,
      isSelected = false,
      isFavorited = false,
      isDisableBtns = false,
      showGroupIcons = false,
      handleClick = () => {},
      handleHistory = () => {},
      handleFavorite = () => {},
    },
    ref
  ) => {
    return (
      <WrapperWordCard
        ref={ref}
        isActive={isSelected}
        isDisableBtns={isDisableBtns}
      >
        <Button
          variant="unstyled"
          disabled={isDisableBtns}
          onClick={() => handleClick(word)}
        >
          {word}
        </Button>

        {showGroupIcons && (
          <GroupIcons>
            {isFavorited && (
              <MdOutlineFavorite onClick={() => handleFavorite(word)} />
            )}

            {isHistory && (
              <CgTrash onClick={() => handleHistory({ word, isAdd: false })} />
            )}
          </GroupIcons>
        )}
      </WrapperWordCard>
    );
  }
);

export default memo(WordCard);
