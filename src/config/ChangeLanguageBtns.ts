import americanEnglishDictionnary from './dictionnaries/en-us';
import frenchDictionnary from './dictionnaries/fr';
import type { VocabStrings } from './vocab/Vocab';

type ButtonData = {
  label: string;
  txt: string;
};

type ButtonsLabelsAndTxt = {
  [Property in keyof VocabStrings]: ButtonData;
};

export const changeLanguagesBtns: ButtonsLabelsAndTxt = {
  fr: {
    label: `Afficher le site en ${frenchDictionnary.LANG}`,
    txt: '🇫🇷'
  },
  'en-us': {
    label: `Display the website in ${americanEnglishDictionnary.LANG}`,
    txt: '🇺🇸'
  }
} as const;

export const SCROLL_LATENCY_MS = 352;

export default changeLanguagesBtns;
