import styled, { css } from 'styled-components';

// TYPES
import { IButtonProps } from './types';
type IProps = Pick<IButtonProps, 'iconSide' | 'variant'>;

export const btnDirections = {
  left: 'row',
  right: 'row-reverse',
  top: 'column',
  bottom: 'column-reverse',
};

export const btnVariants = {
  solid: css`
    color: ${({ theme }) => theme.colors.blue[500]};
    background: ${({ theme }) => theme.colors.blue[50]};

    transition: all 0.2s ease-out;

    &:hover {
      background: ${({ theme }) => theme.colors.blue[100]};
    }
  `,
  outline: css`
    border: 1px solid;
    border-color: ${({ theme }) => theme.colors.blue[500]};

    color: ${({ theme }) => theme.colors.gray[600]};

    &:hover {
      border-color: ${({ theme }) => theme.colors.blue[700]};
    }
  `,
  unstyled: css``,
};

export const WrapperButton = styled.button<IProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${(props) => props.iconSide && btnDirections[props.iconSide]};

  gap: ${({ theme }) => theme.space[2]};
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.space[1]} 0 0;

  font-size: ${({ theme }) => theme.fontSizes.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  transition: all 0.2s ease-out;

  ${(props) => props.variant && btnVariants[props.variant]}

  &:disabled {
    cursor: 'not-allowed';
  }
`;
