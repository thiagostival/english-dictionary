import { render, screen } from '../../tests/test-utils';

import userEvent from '@testing-library/user-event';

import { SectionLeft } from '.';

// MOCKs
import {
  IAuthType,
  IQueryType,
  IGlobalType,
  mockAudio,
  mockClipboard,
  mockQuery,
  mockAuthContext,
  mockGlobalContext,
  globalExample,
  queryExample,
  authExample,
  restoreAllMocks,
} from '../../tests/mocks';

beforeAll(() => {
  restoreAllMocks();
});

describe('Section Left Component', () => {
  it('should render without word', () => {
    render(<SectionLeft />);

    expect(screen.getByText('Please Select a Word')).toBeInTheDocument();
  });

  it('should render with word', () => {
    mockGlobalContext.mockReturnValueOnce(globalExample as IGlobalType);
    mockAuthContext.mockReturnValueOnce(authExample as IAuthType);
    mockQuery.mockReturnValueOnce(queryExample as IQueryType);

    render(<SectionLeft />);

    expect(screen.getByText(globalExample.selectedWord)).toBeInTheDocument();
  });

  it('should button favorite render after login', async () => {
    mockGlobalContext.mockReturnValue(globalExample as IGlobalType);
    mockQuery.mockReturnValue(queryExample as IQueryType);

    const { rerender } = render(<SectionLeft />);

    expect(screen.queryByTestId('btn-favorite')).not.toBeInTheDocument();
    expect(screen.getByText(globalExample.selectedWord)).toBeInTheDocument();

    mockAuthContext.mockReturnValueOnce(authExample as IAuthType);

    rerender(<SectionLeft />);

    expect(screen.getByTestId('btn-favorite')).toBeInTheDocument();
    expect(screen.getByText(globalExample.selectedWord)).toBeInTheDocument();

    restoreAllMocks();
  });

  it('should button listen render with audio', async () => {
    mockGlobalContext.mockReturnValue(globalExample as IGlobalType);
    mockAuthContext.mockReturnValue(authExample as IAuthType);
    mockQuery.mockReturnValueOnce({
      data: {
        ...queryExample.data,
        phonetics: {
          ...queryExample.data.phonetics,
          audio: '',
        },
      },
    } as IQueryType);

    const { rerender } = render(<SectionLeft />);

    expect(screen.queryByTestId('btn-listen')).not.toBeInTheDocument();
    expect(screen.getByText(globalExample.selectedWord)).toBeInTheDocument();

    mockQuery.mockReturnValueOnce(queryExample as IQueryType);

    rerender(<SectionLeft />);

    expect(screen.getByTestId('btn-listen')).toBeInTheDocument();
    expect(screen.getByText(globalExample.selectedWord)).toBeInTheDocument();

    restoreAllMocks();
  });

  it('should button listen execute audio', async () => {
    mockGlobalContext.mockReturnValueOnce(globalExample as IGlobalType);
    mockQuery.mockReturnValueOnce(queryExample as IQueryType);

    render(<SectionLeft />);

    const btnListen = screen.getByTestId('btn-listen');
    await userEvent.click(btnListen);

    expect(mockAudio.play).toHaveBeenCalled();
  });

  it('should button copy save in clipboard', async () => {
    mockGlobalContext.mockReturnValueOnce(globalExample as IGlobalType);
    mockQuery.mockReturnValueOnce(queryExample as IQueryType);

    render(<SectionLeft />);

    const btnListen = screen.getByTestId('btn-copy');
    await userEvent.click(btnListen);

    expect(mockClipboard.writeText).toHaveBeenCalled();
  });
});

afterAll(() => {
  restoreAllMocks();
});
