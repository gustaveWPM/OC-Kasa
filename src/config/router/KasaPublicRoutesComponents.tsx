import { DatabaseProvider } from '../../contexts/DatabaseContext';
import AboutPageInner from '../../pagesInner/About';
import HomePageInner from '../../pagesInner/Home';
import HousingSheetsInner from '../../pagesInner/HousingSheets';
import NotFoundInner from '../../pagesInner/NotFound';
import OnPageChangeEffects, { strictPageTitleBuilder, weakPageTitleBuilder } from '../../pagesInner/_PageEffects';
import { KasaPublicRoutesReactElements } from './types';

export const kasaPublicRoutesComponents: KasaPublicRoutesReactElements = {
  HOME_PAGE: (
    <OnPageChangeEffects title={strictPageTitleBuilder('HOME_PAGE_LABEL')}>
      <DatabaseProvider>
        <HomePageInner />
      </DatabaseProvider>
    </OnPageChangeEffects>
  ),

  ABOUT_PAGE: (
    <OnPageChangeEffects title={strictPageTitleBuilder('ABOUT_PAGE_LABEL')}>
      <AboutPageInner />
    </OnPageChangeEffects>
  ),
  NOTFOUND_PAGE: (
    <OnPageChangeEffects title={weakPageTitleBuilder('404')}>
      <NotFoundInner />
    </OnPageChangeEffects>
  ),
  HOUSING_SHEETS_PAGE: (
    <OnPageChangeEffects title={null}>
      <HousingSheetsInner />
    </OnPageChangeEffects>
  )
};

export default kasaPublicRoutesComponents;
