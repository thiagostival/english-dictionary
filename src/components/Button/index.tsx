import { forwardRef } from 'react';

// STYLES
import { WrapperButton } from './styles';

// TYPES
import { IButtonProps } from './types';

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      icon,
      onlyIcon = false,
      iconSide = 'left',
      variant = 'solid',
      ...rest
    },
    ref
  ) => {
    return (
      <WrapperButton ref={ref} iconSide={iconSide} variant={variant} {...rest}>
        {!!icon && icon}

        {!onlyIcon && children}
      </WrapperButton>
    );
  }
);
