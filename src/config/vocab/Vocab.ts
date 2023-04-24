import frenchDictionnary from '../dictionnaries/fr';
import DbEntityMetadatas from '../metadatasSchema';

export interface VocabSchema {
  LANG: string;
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
}

interface VocabStrings {
  fr: VocabSchema;
}

const Vocab: VocabStrings = {
  fr: frenchDictionnary
};

export const DEFAULT_LANGUAGE: VocabLanguageSymbol = 'fr';
export type VocabSchemaElementKey = keyof VocabSchema;
export type VocabLanguageSymbol = keyof VocabStrings;
export type i18nDbVocab = Omit<
  {
    [Property in keyof VocabStrings]: Partial<DbEntityMetadatas>[];
  },
  typeof DEFAULT_LANGUAGE
>;

export type i18nDbVocabSymbol = keyof i18nDbVocab;

export default Vocab;
