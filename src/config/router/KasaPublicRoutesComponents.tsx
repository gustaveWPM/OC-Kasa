import { KasaPublicRoutesReactElements } from '../../components/KasaRouter';
import AboutPageInner from '../../pagesInner/AboutPage';
import HomePageInner from '../../pagesInner/HomePage';
import HousingSheetsInner from '../../pagesInner/HousingSheets';
import NotFoundInner from '../../pagesInner/NotFound';
import OnPageChangeEffects, { strictPageTitleBuilder, weakPageTitleBuilder } from '../../pagesInner/_PageEffects';

export const kasaPublicRoutesComponents: KasaPublicRoutesReactElements = {
  HOME_PAGE: (
    <OnPageChangeEffects title={strictPageTitleBuilder('HOME_PAGE_LABEL')}>
      <HomePageInner />
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
