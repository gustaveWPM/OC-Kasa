import kasaPublicRoutes from './router/KasaPublicRoutes';
import { VocabAccessor } from './vocab/VocabAccessor';

type NavDataEntities = { title: () => string; path: string }[];
export const NavData: NavDataEntities = [
  {
    title: () => VocabAccessor('HOME_PAGE_LABEL'),
    path: kasaPublicRoutes.HOME_PAGE
  },
  {
    title: () => VocabAccessor('ABOUT_PAGE_LABEL'),
    path: kasaPublicRoutes.ABOUT_PAGE
  }
];

export default NavData;
