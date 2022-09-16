// STYLES
import { WrapperHome } from './styles';

// COMPONENTS
import { SectionLeft } from '../../components/SectionLeft';
import { SectionRight } from '../../components/SectionRight';

export function Home() {
  return (
    <WrapperHome>
      <SectionLeft />

      <SectionRight />
    </WrapperHome>
  );
}
