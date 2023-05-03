import { VocabSchema } from '../vocab/Vocab';
import { BRAND, KASA_COPYRIGHT } from './commons';

export const americanEnglishDictionnary: VocabSchema = {
  LANG: 'American English',
  HOME_PAGE_LABEL: 'Home',
  ABOUT_PAGE_LABEL: 'About',
  HOUSING_SHEETS_PAGE_LABEL: 'Housing sheets',
  NOTFOUND_ERROR_MSG: 'Oops! The page you requested does not exist.',
  SUGGEST_PAGE_INFO_MSG: 'Maybe you wanted to access this page:',
  GO_BACK_TO_HOME_MSG: 'Go back to the home page',
  ALL_RIGHTS_RESERVED: 'All rights reserved',
  KASA_LOGO_ALT: `${BRAND}'s logo`,
  KASA_CATCHPHRASE_FIRST_LINE: 'Be at home,',
  KASA_CATCHPHRASE_SECOND_LINE: 'everywhere and anywhere',
  HOME_PAGE_LOADING_CARDS_LABEL: 'Loading...',
  HOME_PAGE_RETRYING_TO_LOAD_CARDS_LABEL: 'Please, just hold on a second...',
  MAINTENANCE_MESSAGE: 'This page is under maintenance!',
  MAINTENANCE_ADVICE: 'Please, come back later.',
  BRAND,
  KASA_COPYRIGHT
};

export default americanEnglishDictionnary;
