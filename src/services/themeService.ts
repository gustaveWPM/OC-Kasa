import ThemeData from '../config/ThemeData';
import initializeKasaTheme from '../retrieveOrInferTheme';

function memorizeInferedTheme(theme: string) {
  window.localStorage.setItem(ThemeData.LOCAL_STORAGE_THEME_KEY, theme);
}

function flipTheme(choicedTheme: string, rejectedTheme: string) {
  document.body.classList.add(choicedTheme);
  document.body.classList.remove(rejectedTheme);
}

function toggleDarkTheme() {
  flipTheme(ThemeData.DARK_THEME, ThemeData.LIGHT_THEME);
  memorizeInferedTheme(ThemeData.DARK_THEME);
}

function toggleLightTheme() {
  flipTheme(ThemeData.LIGHT_THEME, ThemeData.DARK_THEME);
  memorizeInferedTheme(ThemeData.LIGHT_THEME);
}

export function getThemeFromLocalStorage(): string | null {
  const doGetThemeFromLocalStorage = (): string | null => window.localStorage.getItem(ThemeData.LOCAL_STORAGE_THEME_KEY);
  const currentTheme = doGetThemeFromLocalStorage();
  if (currentTheme === null) {
    initializeKasaTheme();
    return doGetThemeFromLocalStorage();
  }
  return currentTheme;
}

export function toggleTheme(key?: string): string | null {
  function toggleThemeBasedOnLocalStorageFallback() {
    const currentTheme = getThemeFromLocalStorage();
    if (currentTheme !== null) {
      if (currentTheme === ThemeData.LIGHT_THEME) {
        toggleDarkTheme();
      } else if (currentTheme === ThemeData.DARK_THEME) {
        toggleLightTheme();
      }
    }
  }

  function processKey(key: string) {
    if (key === ThemeData.LIGHT_THEME) {
      toggleDarkTheme();
    } else if (key === ThemeData.DARK_THEME) {
      toggleLightTheme();
    } else {
      toggleThemeBasedOnLocalStorageFallback();
    }
  }

  if (key) {
    processKey(key);
  } else {
    toggleThemeBasedOnLocalStorageFallback();
  }

  const newTheme = getThemeFromLocalStorage();
  return newTheme;
}
