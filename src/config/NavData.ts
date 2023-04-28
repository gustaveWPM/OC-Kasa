import kasaPublicRoutes from './router/KasaPublicRoutes';
import { VocabAccessor } from './vocab/VocabAccessor';

export const NavData: { title: string; path: string }[] = [
  {
    title: VocabAccessor('HOME_PAGE_LABEL'),
    path: kasaPublicRoutes.HOME_PAGE
  },
  {
    title: VocabAccessor('ABOUT_PAGE_LABEL'),
    path: kasaPublicRoutes.ABOUT_PAGE
  }
];

export default NavData;
