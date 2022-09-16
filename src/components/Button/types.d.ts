import { ButtonHTMLAttributes, ReactNode } from 'react';

import { btnDirections, btnVariants } from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;

  /**
   * @description icon component
   * @default undefined
   */
  icon?: ReactNode;

  /**
   * @description show only icon
   * @default false
   */
  onlyIcon?: boolean;

  /**
   * @description side of the icon
   * @default left
   */
  iconSide?: keyof typeof btnDirections;

  /**
   * @description style button
   * @default solid
   */
  variant?: keyof typeof btnVariants;
}

export type { IButtonProps };
