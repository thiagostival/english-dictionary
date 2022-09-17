import styled, { css } from 'styled-components';
import { defaultTheme } from '../../styles/themes/default';

import { accessPathObj } from '../../utils/utils';

interface IOverlayProps {
  show?: boolean;
}
interface ITextProps {
  color?: string;
  size?: keyof typeof defaultTheme.fontSizes;
  weight?: keyof typeof defaultTheme.fontWeights;
}

export const Overlay = styled.div<IOverlayProps>`
  display: none;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  background: rgba(0, 0, 0, 0.15);

  ${(props) =>
    props.show &&
    css`
      &,
      & + div {
        display: flex;
      }
    `}

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const WrapperSectionLeft = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);

  width: 85%;
  height: auto;
  max-height: 60%;

  padding: ${({ theme }) => theme.space[7]};
  border-radius: ${({ theme }) => theme.borderRadius.base};

  background: ${({ theme }) => theme.colors.white[100]};
  box-shadow: 0 0 28px 7px rgba(0, 0, 0, 0.1);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;

    width: 100%;
    height: 100%;
    max-height: 100%;

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

export const HeaderMobileSectionLeft = styled.div`
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

  width: 100%;
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
