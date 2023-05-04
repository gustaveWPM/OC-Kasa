import { FunctionComponent, memo } from 'react';
import AboutPageBanner from '../components/AboutPageBanner';
import { accordionsGenerator } from '../components/Accordion';
import { VocabAccessor } from '../config/vocab/VocabAccessor';
import wpmDebugger from '../dev/wpmDebugger';

import './styles/about.scss';

const DEBUGGER_LABEL = 'About Page (React Component)';

interface AboutPageInnerProps {}

export const AboutPageInner: FunctionComponent<AboutPageInnerProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');
  return (
    <>
      <AboutPageBanner />
      <div className="about-page-wrapper">{accordionsGenerator(VocabAccessor('ABOUT_PAGE_ACCORDION_CONTENT'))}</div>
    </>
  );
};

export default memo(AboutPageInner);
