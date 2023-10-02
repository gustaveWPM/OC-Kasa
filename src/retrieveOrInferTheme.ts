import ThemeData from './config/ThemeData';
import { getThemeFromLocalStorage, toggleTheme } from './services/themeService';

export function initializeKasaTheme() {
  const NAVIGATOR_SETTINGS_DARK_THEME_NEEDLE = '(prefers-color-scheme: dark)';
  const retrievedTheme = getThemeFromLocalStorage();
  let rescueCtx = false;

  if (retrievedTheme !== null) {
    if (retrievedTheme === ThemeData.DARK_THEME) {
      toggleTheme(ThemeData.DARK_THEME);
    } else if (retrievedTheme === ThemeData.LIGHT_THEME) {
      toggleTheme(ThemeData.LIGHT_THEME);
    } else {
      rescueCtx = true;
    }
  } else {
    rescueCtx = true;
  }

  if (rescueCtx) {
    if (window.matchMedia && window.matchMedia(NAVIGATOR_SETTINGS_DARK_THEME_NEEDLE).matches) {
      toggleTheme(ThemeData.DARK_THEME);
    } else {
      toggleTheme(ThemeData.LIGHT_THEME);
    }
  }
}

export default initializeKasaTheme;
