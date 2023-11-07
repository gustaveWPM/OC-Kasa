import ThemeData from '../config/ThemeData';

const memorizeInferedTheme = (theme: string) => window.localStorage.setItem(ThemeData.LOCAL_STORAGE_THEME_KEY, theme);

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

export const getThemeFromLocalStorage = (): string | null => window.localStorage.getItem(ThemeData.LOCAL_STORAGE_THEME_KEY);

export function toggleTheme(key?: string): string | null {
  function toggleThemeBasedOnLocalStorageFallback() {
    const currentTheme = getThemeFromLocalStorage();
    if (currentTheme !== null) {
      if (currentTheme === ThemeData.LIGHT_THEME) toggleDarkTheme();
      else if (currentTheme === ThemeData.DARK_THEME) toggleLightTheme();
    }
  }

  function processKey(key: string) {
    if (key === ThemeData.LIGHT_THEME) toggleLightTheme();
    else if (key === ThemeData.DARK_THEME) toggleDarkTheme();
    else toggleThemeBasedOnLocalStorageFallback();
  }

  if (key !== undefined) processKey(key);
  else toggleThemeBasedOnLocalStorageFallback();

  const newTheme = getThemeFromLocalStorage();
  return newTheme;
}
