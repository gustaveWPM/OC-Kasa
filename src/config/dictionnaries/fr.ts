import { VocabSchema } from '../vocab/Vocab';

const BRAND = 'Kasa';
export const frenchDictionnary: VocabSchema = {
  LANG: 'Français',
  BRAND,
  HOME_PAGE_LABEL: 'Accueil',
  ABOUT_PAGE_LABEL: 'A Propos',
  HOUSING_SHEETS_PAGE_LABEL: 'Fiches logement',
  NOTFOUND_ERROR_MSG: "Oups ! La page que vous demandez n'existe pas.",
  SUGGEST_PAGE_INFO_MSG: 'Peut-être que vous vouliez accéder à cette page :',
  GO_BACK_TO_HOME_MSG: "Retourner sur la page d'accueil",
  KASA_COPYRIGHT: `© ${new Date().getFullYear()} ${BRAND}.`,
  ALL_RIGHTS_RESERVED: 'Tout droit réservé',
  KASA_LOGO_ALT: `Logo de ${BRAND}`,
  KASA_CATCHPHRASE_FIRST_LINE: 'Chez vous,',
  KASA_CATCHPHRASE_SECOND_LINE: 'partout et ailleurs'
};

export default frenchDictionnary;
