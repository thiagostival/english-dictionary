// STYLES
import { WrapperHeader } from './styles';

// ASSETS
import favicon from '/favicon.png';

export function Header() {
  return (
    <WrapperHeader>
      <img src={favicon} />

      <span>English Dictionary</span>
    </WrapperHeader>
  );
}
