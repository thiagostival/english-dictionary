import styled, { css } from 'styled-components';

import { btnVariants } from '../Button/styles';

interface ICommonProps {
  isActive?: boolean;
}
interface IWrapperProps {
  isDisabled?: boolean;
}

export const WrapperSectionRight = styled.div<IWrapperProps>`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'all')};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 70%;
    margin-top: ${({ theme }) => theme.space[5]};

    pointer-events: all;
  }
`;

export const TabList = styled.div`
  display: flex;
  justify-content: space-between;

  padding: ${({ theme }) => theme.space[5]};
  user-select: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: start;
    gap: ${({ theme }) => theme.space[10]};
  }
`;

export const Tab = styled.button<ICommonProps>`
  display: flex;

  height: 30px;

  color: ${({ theme }) => theme.colors.blue[900]};

  transition: all 0.2s ease-in-out;

  ${(props) =>
    props.isActive &&
    css`
      font-weight: ${({ theme }) => theme.fontWeights.medium};
      color: ${({ theme }) => theme.colors.blue[700]};
      border-bottom: 2px solid ${({ theme }) => theme.colors.blue[700]};
    `}

  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.colors.blue[700]};
  }
`;

export const TabContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.space[5]};

  background: ${({ theme }) => theme.colors.white[100]};
`;

export const GridTemplate = styled.div`
  display: grid;
  justify-content: start;

  gap: ${({ theme }) => theme.space[2]};
  grid-template-columns: repeat(auto-fit, minmax(100px, auto));

  width: 100%;
  height: fit-content;
`;

export const WrapperButton = styled.div<ICommonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 80px;
  width: 110px;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  ${({ theme, isActive }) =>
    isActive &&
    css`
      border: 2px solid ${theme.colors.blue[300]};
    `}

  > button {
    ${btnVariants.solid}

    font-size: ${({ theme }) => theme.fontSizes.md};

    border-radius: ${({ theme }) => theme.borderRadius.sm} 0;
  }
`;

export const GroupIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: ${({ theme }) => theme.space[3]};

  width: 100%;
  padding: ${({ theme }) => theme.space[1]};

  border-radius: 0 ${({ theme }) => theme.borderRadius.sm};

  background: ${({ theme }) => theme.colors.blue[100]};

  > svg {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.blue[700]};

    transition: all 0.2s ease-out;

    &:hover {
      color: ${({ theme }) => theme.colors.blue[900]};
    }
  }
`;
