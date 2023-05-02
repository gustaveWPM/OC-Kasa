import { FunctionComponent, useState } from 'react';
import ThemeData from '../config/ThemeData';
import wpmDebugger from '../dev/wpmDebugger';
import { getThemeFromLocalStorage, toggleTheme } from '../services/themeService';

const DEBUGGER_LABEL = 'Kasa Change Theme Button (React Component)';

interface ChangeThemeButtonProps {}

const ChangeThemeButton: FunctionComponent<ChangeThemeButtonProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');
  const [currentTheme, setTheme] = useState(getThemeFromLocalStorage());

  function doToggle() {
    const newTheme = toggleTheme();
    setTheme(newTheme);
  }

  return <button onClick={doToggle}>{currentTheme !== ThemeData.DARK_THEME ? 'dark' : 'light'}</button>;
};

export default ChangeThemeButton;
