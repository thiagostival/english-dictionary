import styled, { css } from 'styled-components';
import { scrollBars } from '../../styles/themes/default';

interface ICommonProps {
  isActive?: boolean;
}

export const WrapperSectionRight = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 90%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ theme }) => `calc(70% - ${theme.space[24]})`};
    height: ${({ theme }) => `calc(100% - ${theme.space[5]})`};

    margin-top: ${({ theme }) => theme.space[5]};
  }
`;

export const TabList = styled.div`
  display: flex;
  align-items: center;
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
  width: 100px;
  padding: ${({ theme }) => theme.space[0.5]};

  white-space: nowrap;
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

  &:nth-child(2) {
    width: 70px;
  }
`;

export const TabContent = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.space[2]};

  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.space[5]};

  background: ${({ theme }) => theme.colors.white[100]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 100%;
  }

  overflow: auto;
  ${scrollBars.medium}
`;
