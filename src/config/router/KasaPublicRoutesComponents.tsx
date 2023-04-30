import { DatabaseProvider } from '../../contexts/DatabaseContext';
import AboutPageInner from '../../pagesInner/About';
import HomePageInner from '../../pagesInner/Home';
import HousingSheetsInner from '../../pagesInner/HousingSheets';
import NotFoundInner from '../../pagesInner/NotFound';
import OnPageChangeEffects from '../../pagesInner/_PageEffects';
import { VocabSchemaElementKey } from '../vocab/Vocab';
import { KasaPublicRoutesReactElements } from './types';

const STRICTLY_VOCAB_BINDED_LABELS: Record<string, VocabSchemaElementKey> = {
  HOME_PAGE: 'HOME_PAGE_LABEL',
  ABOUT_PAGE: 'ABOUT_PAGE_LABEL'
};

const WEAKLY_BINDED_LABELS: Record<string, string> = {
  NOTFOUND_PAGE: '404'
};

export const kasaPublicRoutesComponents: KasaPublicRoutesReactElements = {
  HOME_PAGE: (
    <OnPageChangeEffects labelKey={STRICTLY_VOCAB_BINDED_LABELS.HOME_PAGE} pageTitleBuilderStrictMode={true}>
      <DatabaseProvider key="homepageCtx">
        <HomePageInner />
      </DatabaseProvider>
    </OnPageChangeEffects>
  ),
  HOUSING_SHEETS_PAGE: (
    <OnPageChangeEffects>
      <DatabaseProvider key="housingSheetsCtx">
        <HousingSheetsInner />
      </DatabaseProvider>
    </OnPageChangeEffects>
  ),
  ABOUT_PAGE: (
    <OnPageChangeEffects labelKey={STRICTLY_VOCAB_BINDED_LABELS.ABOUT_PAGE} pageTitleBuilderStrictMode={true}>
      <AboutPageInner />
    </OnPageChangeEffects>
  ),
  NOTFOUND_PAGE: (
    <OnPageChangeEffects labelKey={WEAKLY_BINDED_LABELS.NOTFOUND_PAGE} pageTitleBuilderStrictMode={false}>
      <NotFoundInner />
    </OnPageChangeEffects>
  )
};

export default kasaPublicRoutesComponents;
