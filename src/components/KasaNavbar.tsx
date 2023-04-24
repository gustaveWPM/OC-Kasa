import { FunctionComponent } from 'react';
import wpmDebugger from '../dev/wpmDebugger';
import './styles/navbar.scss';

const DEBUGGER_LABEL = 'Kasa Navbar (React Component)';

interface NavbarProps {}

export const Navbar: FunctionComponent<NavbarProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');

  return (
    <>
      <h1>This is the Kasa Navbar</h1>
    </>
  );
};

export default Navbar;
