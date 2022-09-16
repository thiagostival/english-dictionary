import styled, { css, keyframes } from 'styled-components';

interface IProps {
  spin?: boolean;
}

const animationSpin = keyframes`
  0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
`;

export const WrapperLoading = styled.div<IProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  color: ${({ theme }) => theme.colors.blue[700]};

  > svg {
    ${(props) =>
      props.spin &&
      css`
        -webkit-animation: ${animationSpin} 1.5s infinite linear;
        animation: ${animationSpin} 1.5s infinite linear;
      `}
  }
`;
