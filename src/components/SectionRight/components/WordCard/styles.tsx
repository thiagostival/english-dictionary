import styled, { css } from 'styled-components';

interface ICommonProps {
  isActive?: boolean;
  isDisableBtns?: boolean;
}

export const WrapperWordCard = styled.div<ICommonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 90px;
  width: 110px;

  background: ${({ theme }) => theme.colors.blue[50]};

  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transform: translate3d(0px, 0px, -250px) scale(0.93, 0.93);
  transition: 0.3s ease-in-out transform;

  &:hover {
    box-shadow: 0 20px 20px -20px rgba(0, 0, 0, 0.2);
    transform: translate3d(0px, 0px, -250px);
  }

  ${({ theme, isActive }) =>
    isActive &&
    css`
      border: 2px solid ${theme.colors.blue[300]};
      transform: translate3d(0px, 0px, -250px);
    `}

  > button {
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.blue[500]};
    font-size: ${({ theme }) => theme.fontSizes.md};
    border-radius: ${({ theme }) => theme.borderRadius.sm} 0;
  }

  ${(props) =>
    props.isDisableBtns &&
    css`
      cursor: not-allowed;

      > div > svg {
        pointer-events: none;
      }
    `}
`;

export const GroupIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: ${({ theme }) => theme.space[3]};

  width: 100%;
  padding: ${({ theme }) => theme.space[1.5]};

  border-radius: ${({ theme }) => theme.borderRadius.md};

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
