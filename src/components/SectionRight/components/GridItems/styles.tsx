import styled from 'styled-components';

export const WrapperGridItems = styled.div`
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

  width: 100%;

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
