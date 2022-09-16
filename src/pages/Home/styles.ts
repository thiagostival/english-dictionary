import styled from 'styled-components';

export const WrapperHome = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 100vw;
  height: 100vh;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    gap: ${({ theme }) => theme.space[20]};
  }
`;

export const ContentSectionLeft = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 10%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 30%;
    height: 100%;
  }
`;
