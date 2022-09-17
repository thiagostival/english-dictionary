// STYLES
import { WrapperHeader } from './styles';

// COMPONENTS
import { User } from '../User';

// ASSETS
import favicon from '/favicon.png';

export function Header() {
  return (
    <WrapperHeader>
      <img src={favicon} />

      <div>
        <span>English Dictionary</span>

        <User modeShow="mobile" />
      </div>
    </WrapperHeader>
  );
}
