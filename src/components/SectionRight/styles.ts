import styled, { css } from 'styled-components';

interface ICommonProps {
  isActive?: boolean;
}

export const WrapperSectionRight = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ theme }) => `calc(70% - ${theme.space[24]})`};
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

  position: relative;

  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.space[5]};

  overflow: auto;

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

export const ContentMessages = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: ${({ theme }) => theme.space[5]};

  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  bottom: 0;

  text-align: center;
  color: ${({ theme }) => theme.colors.green[700]};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  &.empty {
    color: ${({ theme }) => theme.colors.gray[500]};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }

  &.error {
    color: ${({ theme }) => theme.colors.red[500]};
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;
