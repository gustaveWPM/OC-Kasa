import { FunctionComponent, memo, ReactElement, useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavData from '../config/NavData';
import { FORCE_UPDATE_STATE_LIMIT_TO_AVOID_HUGE_NUMBER_IN_RAM } from '../dev/hooks/_conf/consts';
import wpmDebugger from '../dev/wpmDebugger';
import ChangeLanguageBtn, { Mutators } from './ChangeLanguageButton';
import KasaLogo from './KasaLogo';
import './styles/navbar.scss';

const DEBUGGER_LABEL = 'Kasa Navbar (React Component)';
interface KasaNavbarProps {}

export const KasaNavbar: FunctionComponent<KasaNavbarProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');
  const [forceUpdate, doForceUpdate] = useState(0);
  function navbarItemsGenerator(): ReactElement[] {
    return NavData.map(({ path, title }): ReactElement => {
      const rTo = path;
      return (
        <li key={path + title()} className="no-animation-on-pageload">
          <NavLink to={rTo}>{title()}</NavLink>
        </li>
      );
    });
  }

  const [dummyState, fnPtr] = [(forceUpdate + 1) % FORCE_UPDATE_STATE_LIMIT_TO_AVOID_HUGE_NUMBER_IN_RAM, doForceUpdate];
  const ms: Mutators = { dummyState, fnPtr };
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
        <ChangeLanguageBtn targetLang="fr" mutators={ms} />
        <ChangeLanguageBtn targetLang="en-us" mutators={ms} />
      </div>
    </>
  );
};

export default memo(KasaNavbar);
