import userEvent from '@testing-library/user-event';
import { render, screen } from '../../tests/test-utils';

import { defaultTheme } from '../../styles/themes/default';

import { SectionRight } from '.';

// MOCKs
import {
  IInfiniteQueryType,
  infinityQueryExample,
  mockInfiniteQuery,
  restoreAllMocks,
} from '../../tests/mocks';

beforeAll(() => {
  restoreAllMocks();
});

describe('Section Right Component', () => {
  it('should select tab', async () => {
    render(<SectionRight />);

    const tabWords = screen.getByTestId('tab-Word List');

    expect(tabWords).toHaveStyle({
      color: defaultTheme.colors.blue[700],
    });

    const tabHistory = screen.getByTestId('tab-History');
    await userEvent.click(tabHistory);

    expect(tabHistory).toHaveStyle({
      color: defaultTheme.colors.blue[700],
    });
    expect(tabWords).not.toHaveStyle({
      color: defaultTheme.colors.blue[700],
    });
  });

  it('should render with data', () => {
    mockInfiniteQuery.mockReturnValueOnce(
      infinityQueryExample as IInfiniteQueryType
    );

    render(<SectionRight />);

    expect(screen.getByText('address')).toBeInTheDocument();
    expect(screen.getByText('allowance')).toBeInTheDocument();
  });
});

afterAll(() => {
  restoreAllMocks();
});
