import americanEnglishDictionnary from '../dictionnaries/en-us';
import frenchDictionnary from '../dictionnaries/fr';

export interface VocabSchema {
  LANG: string;
  BRAND: string;
  HOME_PAGE_LABEL: string;
  ABOUT_PAGE_LABEL: string;
  HOUSING_SHEETS_PAGE_LABEL: string;
  NOTFOUND_ERROR_MSG: string;
  SUGGEST_PAGE_INFO_MSG: string;
  GO_BACK_TO_HOME_MSG: string;
  KASA_COPYRIGHT: string;
  ALL_RIGHTS_RESERVED: string;
  KASA_LOGO_ALT: string;
  KASA_CATCHPHRASE_FIRST_LINE: string;
  KASA_CATCHPHRASE_SECOND_LINE: string;
  ABOUT_PAGE_ACCORDION_CONTENT: Record<string, string>;

  HOME_PAGE_LOADING_CARDS_LABEL: string;
  HOME_PAGE_RETRYING_TO_LOAD_CARDS_LABEL: string;
  HOUSING_SHEET_DESCRIPTION_LABEL: string;
  HOUSING_SHEET_EQUIPMENTS_LABEL: string;
  MAINTENANCE_MESSAGE: string;
  MAINTENANCE_ADVICE: string;
}

export interface VocabStrings {
  fr: VocabSchema;
  'en-us': VocabSchema;
}

export const Vocab: VocabStrings = {
  fr: frenchDictionnary,
  'en-us': americanEnglishDictionnary
};

export type VocabSchemaElementKey = keyof VocabSchema;
export type VocabLanguageSymbol = keyof VocabStrings;
export const DEFAULT_LANGUAGE: VocabLanguageSymbol = 'fr';

export default Vocab;
