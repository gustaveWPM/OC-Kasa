import type { FunctionComponent, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import NavData from '../config/NavData';
import wpmDebugger from '../dev/wpmDebugger';
import KasaLogo from './KasaLogo';
import Settings from './Settings';

import './styles/navbar.scss';

const DEBUGGER_LABEL = 'Kasa Navbar (React Component)';
interface KasaNavbarProps {}

function navbarItemsGenerator(): ReactElement[] {
  return NavData.map(({ getPath, getTitle }): ReactElement => {
    const rTo = getPath();
    return (
      <li key={`navbar-item-${rTo}-${getTitle()}`}>
        <NavLink to={rTo}>{getTitle()}</NavLink>
      </li>
    );
  });
}

export const KasaNavbar: FunctionComponent<KasaNavbarProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');

  return (
    <>
      <div className="navbar-unscrolled-page-height-diff" />
      <div className="navbar">
        <div className="navbar-content">
          <KasaLogo currentUseCase="NAVBAR" />
          <div className="navbar-menu-wrapper">
            <Settings />
            <nav className="navbar-menu">
              <ul className="navbar-menu-elements">{navbarItemsGenerator()}</ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default KasaNavbar;
