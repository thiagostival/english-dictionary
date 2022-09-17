import styled, { css } from 'styled-components';

export const configWrapper = {
  mobile: css`
    display: flex;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none;
    }
  `,
  web: css`
    display: none;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      display: flex;
      flex: 1;
      flex-direction: row-reverse;
    }
  `,
  none: css`
    display: flex;
  `,
};

interface IWrapperProps {
  modeShow?: keyof typeof configWrapper;
}

export const WrapperSignIn = styled.div<IWrapperProps>`
  ${(props) => configWrapper[props.modeShow || 'web']}
`;

export const BtnLogin = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: ${({ theme }) => theme.space[1]};

  transition: all 0.2s linear;

  > svg,
  span {
    color: ${({ theme }) => theme.colors.gray[500]};
  }

  > span {
    width: 40px;
    overflow: hidden;
    white-space: nowrap;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  > svg {
    width: 30px;
    height: 30px;
  }

  &:focus {
    > span {
      filter: brightness(0.5);
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    gap: ${({ theme }) => theme.space[2]};

    > span {
      display: flex;
      width: auto;

      font-size: ${({ theme }) => theme.fontSizes.md};
    }

    &:hover {
      box-shadow: 0px 1px 0px 0px ${({ theme }) => theme.colors.blue[700]};
    }
  }
`;

export const DataUser = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  gap: ${({ theme }) => theme.space[2]};

  > span {
    display: none;
  }

  > svg {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.red[300]};

    transition: all 0.2s linear;

    &:hover {
      color: ${({ theme }) => theme.colors.red[500]};
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;

    gap: ${({ theme }) => theme.space[2]};

    color: ${({ theme }) => theme.colors.gray[500]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};

    > span,
    > svg {
      display: initial;
    }
  }
`;
