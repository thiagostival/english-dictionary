// STYLES
import { ContentSectionLeft, WrapperHome } from './styles';

// COMPONENTS
import { Header } from '../../components/Header';
import { SectionLeft } from '../../components/SectionLeft';
import { SectionRight } from '../../components/SectionRight';

export function Home() {
  return (
    <WrapperHome>
      <ContentSectionLeft>
        <Header />
        <SectionLeft />
      </ContentSectionLeft>

      <SectionRight />
    </WrapperHome>
  );
}
