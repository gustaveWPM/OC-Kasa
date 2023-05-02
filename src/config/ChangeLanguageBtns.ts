import { VocabStrings } from './vocab/Vocab';

type ButtonData = {
  label: string;
  txt: string;
};

type ButtonsLabelsAndTxt = {
  [Property in keyof VocabStrings]: ButtonData;
};

export const changeLanguagesBtns: ButtonsLabelsAndTxt = {
  fr: {
    label: 'Afficher le site en Français',
    txt: '🇫🇷'
  },
  'en-us': {
    label: 'Display the website in English',
    txt: '🇺🇸'
  }
};

export const SCROLL_LATENCY_MS = 150;

export default changeLanguagesBtns;
