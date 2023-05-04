import { FunctionComponent, memo, ReactElement } from 'react';
import AboutPageBanner from '../components/AboutPageBanner';
import { VocabAccessor } from '../config/vocab/VocabAccessor';
import wpmDebugger from '../dev/wpmDebugger';

import './styles/about.scss';

const DEBUGGER_LABEL = 'About Page (React Component)';

interface AboutPageInnerProps {}

function accordionGenerator(): ReactElement[] {
  const accordionContent: Record<string, string> = VocabAccessor('ABOUT_PAGE_ACCORDION_CONTENT');
  const fragments: ReactElement[] = [];

  for (const [key, value] of Object.entries(accordionContent)) {
    fragments.push(
      <div key={`accordion-fragment-${key}-${value}`}>
        <h2>{key}</h2>
        <p>{value}</p>
      </div>
    );
  }
  return fragments;
}

export const AboutPageInner: FunctionComponent<AboutPageInnerProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');
  return (
    <>
      <AboutPageBanner />
      <div className="about-page-wrapper">{accordionGenerator()}</div>
    </>
  );
};

export default memo(AboutPageInner);
