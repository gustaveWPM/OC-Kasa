import { FunctionComponent, memo, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import NavData from '../config/NavData';
import wpmDebugger from '../dev/wpmDebugger';
import { changeLanguageBtnsGenerator } from './ChangeLanguageButton';
import KasaLogo from './KasaLogo';
import './styles/navbar.scss';

const DEBUGGER_LABEL = 'Kasa Navbar (React Component)';
interface KasaNavbarProps {}

export const KasaNavbar: FunctionComponent<KasaNavbarProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');
  function navbarItemsGenerator(): ReactElement[] {
    return NavData.map(({ getPath, getTitle }): ReactElement => {
      const rTo = getPath();
      return (
        <li key={rTo + getTitle()} className="no-animation-on-pageload">
          <NavLink to={rTo}>{getTitle()}</NavLink>
        </li>
      );
    });
  }

  return (
    <>
      <div className="navbar-unscrolled-page-height-diff"></div>
      <div className="navbar">
        <div className="navbar-content">
          <KasaLogo currentUseCase="HEADER" />
          <nav className="navbar-menu">
            <ul className="navbar-menu-elements">{navbarItemsGenerator()}</ul>
          </nav>
        </div>
        {changeLanguageBtnsGenerator()}
      </div>
    </>
  );
};

export default memo(KasaNavbar);
