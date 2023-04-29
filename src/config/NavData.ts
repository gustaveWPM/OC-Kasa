import kasaPublicRoutes from './router/KasaPublicRoutes';
import { i18nRouteAccessor, VocabAccessor } from './vocab/VocabAccessor';

type NavDataEntities = { getTitle: () => string; getPath: () => string }[];
export const NavData: NavDataEntities = [
  {
    getTitle: () => VocabAccessor('HOME_PAGE_LABEL'),
    getPath: () => i18nRouteAccessor(kasaPublicRoutes.HOME_PAGE)
  },
  {
    getTitle: () => VocabAccessor('ABOUT_PAGE_LABEL'),
    getPath: () => i18nRouteAccessor(kasaPublicRoutes.ABOUT_PAGE)
  }
];

export default NavData;
