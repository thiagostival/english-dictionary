import { memo } from 'react';
import { CgTrash } from 'react-icons/cg';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';

// STYLES
import { GroupIcons, WrapperWordCard } from './styles';

// COMPONENTS
import { Button } from '../../Button';

// TYPES
interface IWordCardProps {
  word: string;
  isHistory?: boolean;
  isSelected?: boolean;
  isFavorited?: boolean;
  showGroupIcons?: boolean;
  handleClick?: (word: string) => void;
  handleHistory?: (word: string) => void;
  handleFavorite?: (word: string) => void;
}

function WordCard({
  word,
  isHistory = false,
  isSelected = false,
  isFavorited = false,
  showGroupIcons = false,
  handleClick = () => {},
  handleHistory = () => {},
  handleFavorite = () => {},
}: IWordCardProps) {
  return (
    <WrapperWordCard isActive={isSelected}>
      <Button variant="unstyled" onClick={() => handleClick(word)}>
        {word}
      </Button>

      {showGroupIcons && (
        <GroupIcons>
          {isFavorited ? (
            <MdOutlineFavorite onClick={() => handleFavorite(word)} />
          ) : (
            <MdOutlineFavoriteBorder onClick={() => handleFavorite(word)} />
          )}

          {isHistory && <CgTrash onClick={() => handleHistory(word)} />}
        </GroupIcons>
      )}
    </WrapperWordCard>
  );
}

export default memo(WordCard);
