import { ReactElement } from 'react';
import { getRouteParams as getHousingSheetsRouteParams } from '../../pagesInner/HousingSheets';
import { VocabAccessor } from '../vocab/VocabAccessor';
import { KasaPublicRoutes } from './types';

export const DAMERAU_LEVENSHTEIN_RESCUE_REDIRECT_DISTANCE_THRESHOLD: number = 3;
export const DAMERAU_LEVENSHTEIN_RESCUE_SUGGEST_DISTANCE_THRESHOLD: number = 4;
export const MINIMAL_AMOUNT_OF_CHARACTERS_IN_USER_TRIED_ROUTE_TO_FORCE_A_SUGGEST: number = 5;

export const kasaPublicRoutes: KasaPublicRoutes = {
  HOME_PAGE: '/',
  ABOUT_PAGE: '/about-us',
  NOTFOUND_PAGE: '/404',
  HOUSING_SHEETS_PAGE: '/housing-sheets'
};

export const kasaPublicRoutesTitles: KasaPublicRoutes = {
  HOME_PAGE: VocabAccessor('HOME_PAGE_LABEL'),
  ABOUT_PAGE: VocabAccessor('ABOUT_PAGE_LABEL'),
  NOTFOUND_PAGE: '',
  HOUSING_SHEETS_PAGE: VocabAccessor('HOUSING_SHEETS_PAGE_LABEL')
};

export const SKIPPED_FROM_404_SUGGESTIONS_ROUTES: string[] = [kasaPublicRoutes.NOTFOUND_PAGE, kasaPublicRoutes.HOME_PAGE];
export const PARAMS_ROUTES: { route: string; params: ReactElement }[] = [
  { route: kasaPublicRoutes.HOUSING_SHEETS_PAGE, params: getHousingSheetsRouteParams() }
];

export type KasaPublicRouteElementKey = keyof KasaPublicRoutes;
export type { default as IDamLevRouteBestScore } from '../../dev/math/IDamLevRouteBestScore';
export default kasaPublicRoutes;
