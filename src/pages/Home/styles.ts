import styled from 'styled-components';

export const WrapperHome = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[10]};

  position: relative;

  width: 100vw;
  height: 100vh;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
  }
`;
