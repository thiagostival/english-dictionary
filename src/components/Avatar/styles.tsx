import styled from 'styled-components';

export const WrapperAvatar = styled.div`
  display: flex;

  width: 40px;
  height: 40px;

  border-radius: 50%;

  > img {
    max-height: 100%;
    border-radius: 50%;
  }

  > svg {
    width: 100%;
    height: 100%;

    color: ${({ theme }) => theme.colors.gray[600]};
  }
`;
