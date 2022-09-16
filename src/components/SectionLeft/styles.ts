import styled, { css } from 'styled-components';
import { defaultTheme } from '../../styles/themes/default';

import { accessPathObj } from '../../utils/utils';

interface IWrapperProps {
  show?: boolean;
}
interface ITextProps {
  color?: string;
  size?: keyof typeof defaultTheme.fontSizes;
  weight?: keyof typeof defaultTheme.fontWeights;
}

export const WrapperSectionLeft = styled.div<IWrapperProps>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);

  width: 85%;
  height: 60%;

  padding: ${({ theme }) => theme.space[7]};
  border-radius: ${({ theme }) => theme.borderRadius.base};

  background: ${({ theme }) => theme.colors.white[100]};
  box-shadow: 0 0 28px 7px rgba(0, 0, 0, 0.1);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;

    width: 30%;
    height: 100%;

    padding: ${({ theme }) => theme.space[12]};

    position: relative;
    top: 0;
    left: 0;
    transform: none;

    box-shadow: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.space[5]};
  }
`;

export const HeaderSectionLeft = styled.div`
  display: flex;
  align-self: flex-end;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const ContentSectionLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  flex: 1;
  gap: ${({ theme }) => theme.space[10]};
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.space[2]};

  > span {
    padding-left: ${({ theme }) => theme.space[0.5]};
  }
`;

export const GroupButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: ${({ theme }) => theme.space[2.5]};
  width: 100%;
  height: 60px;
  margin-bottom: ${({ theme }) => theme.space[5]};
`;

export const Meanings = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.space[2.5]};

  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    > span {
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }
    > .means {
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }
  }
`;

export const Text = styled.span<ITextProps>`
  ${(props) => css`
    color: ${({ theme }) =>
      props.color
        ? accessPathObj(theme.colors, props.color)
        : theme.colors.blue[300]};
    font-size: ${({ theme }) => theme.fontSizes[props?.size || 'sm']};
    font-weight: ${({ theme }) => theme.fontWeights[props?.weight || 'normal']};
  `}
`;
