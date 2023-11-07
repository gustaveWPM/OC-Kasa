import type { VocabSchema } from '../vocab/Vocab';
import COMMONS from './commons';

export const frenchDictionnary: VocabSchema = {
  ...COMMONS,
  LANG: 'Français',
  HOME_PAGE_LABEL: 'Accueil',
  ABOUT_PAGE_LABEL: 'A Propos',
  HOUSING_SHEETS_PAGE_LABEL: 'Fiches logement',
  NOTFOUND_ERROR_MSG: "Oups ! La page que vous demandez n'existe pas.",
  SUGGEST_PAGE_INFO_MSG: 'Peut-être que vous vouliez accéder à cette page :',
  GO_BACK_TO_HOME_MSG: "Retourner sur la page d'accueil",
  ALL_RIGHTS_RESERVED: 'Tous droits réservés',
  KASA_LOGO_ALT: `Logo de ${COMMONS.BRAND}`,
  KASA_CATCHPHRASE_FIRST_LINE: 'Chez vous,',
  KASA_CATCHPHRASE_SECOND_LINE: 'partout et ailleurs',
  HOME_PAGE_LOADING_CARDS_LABEL: 'Chargement en cours...',
  HOME_PAGE_RETRYING_TO_LOAD_CARDS_LABEL: 'Encore un instant...',

  ABOUT_PAGE_ACCORDION_CONTENT: {
    Fiabilité:
      'Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements, et toutes les informations sont régulièrement vérifiées  par nos équipes.',
    Respect:
      'La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme.',
    Service:
      "Nos équipes se tiennent à votre disposition pour vous fournir une expérience parfaite. N'hésitez pas à nous contacter si vous avez la moindre question.",
    Sécurité:
      "La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien à l'hôte qu'au locataire, cela permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur la sécurité domestique pour nos hôtes."
  },

  HOUSING_SHEET_DESCRIPTION_LABEL: 'Description',
  HOUSING_SHEET_EQUIPMENTS_LABEL: 'Équipements',

  IMAGE_SLIDER_PREV_IMAGE_ARIA_LABEL: 'Image précédente',
  IMAGE_SLIDER_NEXT_IMAGE_ARIA_LABEL: 'Image suivante',

  MAINTENANCE_MESSAGE: 'Cette page est en cours de maintenance !',
  MAINTENANCE_ADVICE: 'Merci de revenir plus tard.'
} as const;

export default frenchDictionnary;
