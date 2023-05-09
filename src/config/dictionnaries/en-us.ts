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

  ABOUT_PAGE_ACCORDION_CONTENT: {
    Reliability:
      'The ads posted on Kasa guarantee total reliability. The photos are by the properties, and our teams regularly check all information.',
    Respect:
      "Kindness is one of Kasa's founding values. Any discriminatory behavior or neighborhood disruption will result in exclusion from our platform.",
    Service: 'Our teams are at your disposal to provide you with a perfect experience. Do not hesitate to contact us if you have any questions.',
    Safety:
      "Safety is Kasa's priority. For our guests and travelers alike, each accommodation meets the safety criteria established by our services. By leaving a rating for both the host and the tenant, our staff can verify that the standards are being met. We also organize workshops on home safety for our guests."
  },

  HOUSING_SHEET_DESCRIPTION_LABEL: 'Description',
  HOUSING_SHEET_EQUIPMENTS_LABEL: 'Equipments',

  IMAGE_SLIDER_NEXT_IMAGE_ARIA_LABEL: 'Next image',
  IMAGE_SLIDER_PREV_IMAGE_ARIA_LABEL: 'Previous image',

  MAINTENANCE_MESSAGE: 'This page is under maintenance!',
  MAINTENANCE_ADVICE: 'Please, come back later.',
  BRAND,
  KASA_COPYRIGHT
};

export default americanEnglishDictionnary;
