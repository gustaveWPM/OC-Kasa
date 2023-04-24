import { FunctionComponent } from 'react';
import wpmDebugger from '../dev/wpmDebugger';

const DEBUGGER_LABEL = 'HomePage (React Component)';

interface HomePageInnerProps {}

import './styles/homepage.scss';

export const HomePageInner: FunctionComponent<HomePageInnerProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');

  return (
    <>
      <h1>This is the homepage</h1>
    </>
  );
};

export default HomePageInner;
