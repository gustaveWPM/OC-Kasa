import { VocabSchema } from '../vocab/Vocab';

export const americanEnglishDictionnary: VocabSchema = {
  LANG: 'American English',
  HOME_PAGE_LABEL: 'Home',
  ABOUT_PAGE_LABEL: 'About',
  HOUSING_SHEETS_PAGE_LABEL: 'Hougins sheets',
  NOTFOUND_ERROR_MSG: 'Oops! The page you requested does not exist.',
  SUGGEST_PAGE_INFO_MSG: 'Maybe you wanted to access this page:',
  GO_BACK_TO_HOME_MSG: 'Go back to the home page',
  KASA_COPYRIGHT: `© ${new Date().getFullYear()} Kasa.`,
  ALL_RIGHTS_RESERVED: 'All rights reserved',
  KASA_LOGO_ALT: "Kasa's logo",
  KASA_CATCHPHRASE_FIRST_LINE: 'Be at home,',
  KASA_CATCHPHRASE_SECOND_LINE: 'everywhere and anywhere'
};

export default americanEnglishDictionnary;
