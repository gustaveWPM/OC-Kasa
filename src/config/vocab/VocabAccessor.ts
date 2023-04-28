import Vocab, { DEFAULT_LANGUAGE, VocabLanguageSymbol, VocabSchemaElementKey } from './Vocab';

function isVocabLanguageSymbol(s: string) {
  return s in Vocab;
}

export function setCurrentLanguageInLocalStorage(value: VocabLanguageSymbol) {
  window.localStorage.setItem('lang', value);
}

function getCurrentLanguageInLocalStorage(): VocabLanguageSymbol | null {
  const data: string | null = window.localStorage.getItem('lang');
  if (!data) {
    return null;
  }
  return data as VocabLanguageSymbol;
}

function initializeLangLocalStorage() {
  if (getCurrentLanguageInLocalStorage()) {
    return;
  }

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

function getCurrentUserVocabLanguageSymbol(): VocabLanguageSymbol {
  initializeLangLocalStorage();
  const curLang: VocabLanguageSymbol | null = getCurrentLanguageInLocalStorage();
  if (!curLang) {
    return DEFAULT_LANGUAGE;
  }
  return curLang;
}

export function alreadyCurrentUserVocabLanguageSymbol(lang: VocabLanguageSymbol): boolean {
  return lang === getCurrentUserVocabLanguageSymbol();
}

export function isVocabSchemaElementKey(s: string) {
  return s in Vocab[DEFAULT_LANGUAGE];
}

export function VocabAccessor(vocabSchemaElementKey: VocabSchemaElementKey): string {
  return Vocab[getCurrentUserVocabLanguageSymbol()][vocabSchemaElementKey];
}

export function getDbFetchEndpoint(): string {
  console.log(getCurrentUserVocabLanguageSymbol());
  return `/json/logements.${getCurrentUserVocabLanguageSymbol()}.json`;
}
