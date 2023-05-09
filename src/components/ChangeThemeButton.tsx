import { FunctionComponent, useState } from 'react';
import ThemeData from '../config/ThemeData';
import wpmDebugger from '../dev/wpmDebugger';
import { getThemeFromLocalStorage, toggleTheme } from '../services/themeService';

const DEBUGGER_LABEL = 'Kasa Change Theme Button (React Component)';

interface ChangeThemeButtonProps {}

const ChangeThemeButton: FunctionComponent<ChangeThemeButtonProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');
  const [currentTheme, setTheme] = useState(getThemeFromLocalStorage());

  const darkBtn = (
    <svg className="dark-mode-btn" width="18" height="18" viewBox="0 0 24 24">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentcolor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    </svg>
  );

  const lightBtn = (
    <svg className="light-mode-btn" width="18" height="18" viewBox="0 0 24 24">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
      </svg>
    </svg>
  );

  function doToggle() {
    const newTheme = toggleTheme();
    setTheme(newTheme);
  }

  return (
    <button className="change-theme-btn" onClick={doToggle} aria-label="theme">
      {currentTheme !== ThemeData.DARK_THEME ? darkBtn : lightBtn}
    </button>
  );
};

export default ChangeThemeButton;
