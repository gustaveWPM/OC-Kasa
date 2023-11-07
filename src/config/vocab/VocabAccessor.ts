import type { VocabLanguageSymbol, VocabSchemaElementKey } from './Vocab';
import Vocab, { DEFAULT_LANGUAGE } from './Vocab';
const LOCAL_STORAGE_LANG_KEY: string = 'lang';

const isVocabLanguageSymbol = (s: string) => s in Vocab;

export const setCurrentLanguageInLocalStorage = (value: VocabLanguageSymbol) => window.localStorage.setItem(LOCAL_STORAGE_LANG_KEY, value);

function getCurrentLanguageInLocalStorage(): VocabLanguageSymbol | null {
  const data: string | null = window.localStorage.getItem(LOCAL_STORAGE_LANG_KEY);
  if (!data) return null;
  if (!isVocabLanguageSymbol(data)) setCurrentLanguageInLocalStorage(DEFAULT_LANGUAGE);
  return data as VocabLanguageSymbol;
}

function initializeLangLocalStorage() {
  if (getCurrentLanguageInLocalStorage()) return;

  const navigatorLanguages: readonly string[] = navigator.languages;
  for (const language of navigatorLanguages) {
    const lang: string = language.toLowerCase();
    if (isVocabLanguageSymbol(lang)) {
      setCurrentLanguageInLocalStorage(language as VocabLanguageSymbol);
      return;
    }
  }

  setCurrentLanguageInLocalStorage(DEFAULT_LANGUAGE);
}

export function getCurrentUserVocabLanguageSymbol(): VocabLanguageSymbol {
  initializeLangLocalStorage();
  const curLang: VocabLanguageSymbol | null = getCurrentLanguageInLocalStorage();
  if (!curLang) return DEFAULT_LANGUAGE;
  return curLang;
}

export const alreadyCurrentUserVocabLanguageSymbol = (lang: VocabLanguageSymbol): boolean => lang === getCurrentUserVocabLanguageSymbol();

export const isVocabSchemaElementKey = (s: string) => s in Vocab[DEFAULT_LANGUAGE];

export const VocabAccessor = (vocabSchemaElementKey: VocabSchemaElementKey): any => Vocab[getCurrentUserVocabLanguageSymbol()][vocabSchemaElementKey];

export const getDbFetchEndpoint = (): string => `/json/logements.${getCurrentUserVocabLanguageSymbol()}.json`;

function getI18nNeedle(route: string): string | null {
  for (const languageSymbol in Vocab) {
    const needle = '/' + languageSymbol + '/';
    if (route.startsWith(needle)) return needle;
  }
  return null;
}

export function userLangAndRouteLangMismatch(route: string): boolean {
  const needle = getI18nNeedle(route);
  const userVocabLanguageSymbol = getCurrentUserVocabLanguageSymbol();
  if (!needle) return false;

  return !needle.includes(userVocabLanguageSymbol);
}

export function routeWithoutI18nAccessor(route: string): string {
  const needle = getI18nNeedle(route);
  if (!needle) return route;

  if (route.startsWith(needle)) return route.substring(needle.length - 1);
  return route;
}

export function i18nRouteAccessor(route: string, unsafeMode = false): string {
  const r = unsafeMode ? routeWithoutI18nAccessor(route) : route;
  return '/' + getCurrentUserVocabLanguageSymbol() + r;
}
