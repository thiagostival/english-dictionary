import { HTMLAttributes } from 'react';
import { ImSpinner2 } from 'react-icons/im';

// STYLES
import { WrapperLoading } from './styles';

// TYPES
interface ILoadingProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description animate icon
   * @default true
   */
  spin?: boolean;

  /**
   * @description size icon
   * @default 30
   */
  size?: number;
}

export function Loading({ spin = true, size = 30, ...rest }: ILoadingProps) {
  return (
    <WrapperLoading spin={spin} {...rest}>
      <ImSpinner2 size={size} />
    </WrapperLoading>
  );
}
