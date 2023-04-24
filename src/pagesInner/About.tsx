import { FunctionComponent } from 'react';
import wpmDebugger from '../dev/wpmDebugger';

const DEBUGGER_LABEL = 'About Page (React Component)';

interface AboutPageInnerProps {}

export const AboutPageInner: FunctionComponent<AboutPageInnerProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');
  return (
    <>
      <h1>This is the About Page</h1>
    </>
  );
};

export default AboutPageInner;
