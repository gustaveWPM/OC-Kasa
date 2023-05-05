import { FunctionComponent, memo } from 'react';
import AboutPageBanner from '../components/AboutPageBanner';
import Accordion from '../components/Accordion';
import { AccordionData } from '../components/_types';
import { VocabAccessor } from '../config/vocab/VocabAccessor';
import wpmDebugger from '../dev/wpmDebugger';

import './styles/about.scss';

const DEBUGGER_LABEL = 'About Page (React Component)';

interface AboutPageInnerProps {}

function accordionGenerator(): AccordionData[] {
  const accordionItems: AccordionData[] = [];
  const accordionContent = VocabAccessor('ABOUT_PAGE_ACCORDION_CONTENT');

  for (const [title, text] of Object.entries(accordionContent)) {
    accordionItems.push({
      title,
      content: <p>{text as string}</p>
    });
  }
  return accordionItems;
}

export const AboutPageInner: FunctionComponent<AboutPageInnerProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');

  return (
    <>
      <AboutPageBanner />
      <Accordion items={accordionGenerator()} />
    </>
  );
};

export default memo(AboutPageInner);
