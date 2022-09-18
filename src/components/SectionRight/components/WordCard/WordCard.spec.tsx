import userEvent from '@testing-library/user-event';

import { render, screen } from '../../../../tests/test-utils';

import { defaultTheme } from '../../../../styles/themes/default';
import WordCard from '.';

// MOCKs
import { restoreAllMocks } from '../../../../tests/mocks';

const defaultProps = {
  word: 'hello',
  handleClick: jest.fn(),
  handleHistory: jest.fn(),
  handleFavorite: jest.fn(),
};

beforeAll(() => {
  restoreAllMocks();
});

describe('Word Card Component', () => {
  it('should render word', () => {
    render(<WordCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.word)).toBeInTheDocument();
  });

  it('should render group icons', () => {
    const { rerender } = render(<WordCard {...defaultProps} />);

    expect(screen.queryByTestId('group-icons')).not.toBeInTheDocument();

    rerender(<WordCard {...defaultProps} showGroupIcons />);

    expect(screen.queryByTestId('group-icons')).toBeInTheDocument();
  });

  it('should select word', async () => {
    const { rerender } = render(<WordCard {...defaultProps} />);

    const btnCard = screen.getByTestId('btn-card');

    await userEvent.click(btnCard);

    expect(defaultProps.handleClick).toHaveBeenCalled();

    rerender(<WordCard {...defaultProps} isSelected />);

    expect(screen.getByTestId('word-card')).toHaveStyle({
      border: `2px solid ${defaultTheme.colors.blue[300]}`,
    });
  });

  it('should add/remove word of the favorites', async () => {
    render(<WordCard {...defaultProps} showGroupIcons isFavorited />);

    const btnCard = screen.getByTestId('btn-favorite');

    await userEvent.click(btnCard);

    expect(defaultProps.handleFavorite).toHaveBeenCalled();
  });

  it('should remove word of the history', async () => {
    render(<WordCard {...defaultProps} showGroupIcons isHistory />);

    const btnCard = screen.getByTestId('btn-history');

    await userEvent.click(btnCard);

    expect(defaultProps.handleHistory).toHaveBeenCalled();
  });
});

afterAll(() => {
  restoreAllMocks();
});
