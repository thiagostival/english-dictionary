import React from 'react';
import { render, screen, waitFor } from '../../tests/test-utils';

import { Avatar } from '.';

// MOCKs
import { restoreAllMocks } from '../../tests/mocks';

const src = '/favicon.png';

beforeAll(() => {
  restoreAllMocks();
});

describe('Avatar Component', () => {
  it('should render icon', () => {
    render(<Avatar />);

    expect(screen.getByTestId('avatar-icon')).toBeInTheDocument();
  });

  it('should render img', async () => {
    jest.spyOn(React, 'useState').mockReturnValueOnce([src, jest.fn()]);

    render(<Avatar src={src} />);

    await waitFor(
      () => expect(screen.queryByTestId('avatar-img')).toBeInTheDocument(),
      { timeout: 1000 }
    );

    expect(screen.getByTestId('avatar-img')).toBeInTheDocument();

    jest.unmock('react');
  });
});

afterAll(() => {
  restoreAllMocks();
});
