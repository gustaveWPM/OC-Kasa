import type { FunctionComponent, ReactElement } from 'react';
import AboutPageBanner from '../components/AboutPageBanner';
import Accordion from '../components/Accordion';
import { VocabAccessor } from '../config/vocab/VocabAccessor';
import wpmDebugger from '../dev/wpmDebugger';

import './styles/about.scss';

const DEBUGGER_LABEL = 'About Page (React Component)';

interface AboutPageInnerProps {}

function accordionsGenerator(): ReactElement[] {
  const accordions: ReactElement[] = [];
  const accordionContent = VocabAccessor('ABOUT_PAGE_ACCORDION_CONTENT');

  let i = 0;
  for (const [title, text] of Object.entries(accordionContent)) {
    accordions.push(<Accordion key={`about-page-accordion-${i}`} items={[{ title, content: <p>{text as string}</p> }]} />);
    i += 1;
  }
  return accordions;
}

export const AboutPageInner: FunctionComponent<AboutPageInnerProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');

  return (
    <>
      <AboutPageBanner />
      <div className="about-page-accordion-wrapper">{accordionsGenerator()}</div>
    </>
  );
};

export default AboutPageInner;
