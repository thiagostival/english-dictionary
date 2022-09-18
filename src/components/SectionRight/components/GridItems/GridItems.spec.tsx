import { render, screen } from '../../../../tests/test-utils';

import { GridItems } from '.';

// MOCKs
import { restoreAllMocks } from '../../../../tests/mocks';

const children = 'Teste';

beforeAll(() => {
  restoreAllMocks();
});

describe('Word Card Component', () => {
  it('should render with children', () => {
    render(<GridItems>{children}</GridItems>);

    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it('should render with authentication required', () => {
    const { rerender } = render(
      <GridItems isNeedAuth name="Teste">
        {children}
      </GridItems>
    );

    expect(screen.queryByText(children)).not.toBeInTheDocument();
    expect(
      screen.getByText('to access Teste you must be logged in')
    ).toBeInTheDocument();

    rerender(
      <GridItems isNeedAuth isAuthenticated name="Teste">
        {children}
      </GridItems>
    );

    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it('should render error message in body', () => {
    render(<GridItems errorMessage="Error Test">{children}</GridItems>);

    expect(screen.getByText(children)).toBeInTheDocument();
    expect(screen.getByText('Error Test')).toBeInTheDocument();
  });

  it('should render error message with empty body', () => {
    render(
      <GridItems errorMessage="Error Test" isEmpty>
        {children}
      </GridItems>
    );

    expect(screen.queryByText(children)).not.toBeInTheDocument();
    expect(screen.getByText('Error Test')).toBeInTheDocument();
  });
});

afterAll(() => {
  restoreAllMocks();
});
