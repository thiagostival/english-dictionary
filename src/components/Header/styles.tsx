import styled from 'styled-components';

export const WrapperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 100%;

  user-select: none;

  gap: ${({ theme }) => theme.space[5]};
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[5]}`};

  background: ${({ theme }) => theme.colors.white[100]};

  > img {
    max-height: 100%;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    gap: ${({ theme }) => theme.space[2]};

    > span {
      font-size: ${({ theme }) => theme.fontSizes.lg};
      font-weight: ${({ theme }) => theme.fontWeights.bold};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 10%;
    padding-bottom: 0;
  }
`;
