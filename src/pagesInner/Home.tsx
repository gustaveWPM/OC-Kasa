import { FunctionComponent, ReactElement, ReactNode, memo, useEffect, useState } from 'react';
import ErrorBox from '../components/ErrorBox';
import HomepageBanner from '../components/HomepageBanner';
import KasaCard from '../components/KasaCard';
import DbEntityMetadatas from '../config/MetadatasSchema';
import { VocabAccessor } from '../config/vocab/VocabAccessor';
import { useDatabase } from '../contexts/DatabaseContext';
import { FetchResponseSchema, TLoadingState } from '../dev/hooks/useFetch';
import cachedDatabase from '../dev/namespaces/cache';
import wpmDebugger from '../dev/wpmDebugger';
import { getDbCtxEntitiesIds, getDbPartialElements } from '../services/dbService';
import HomepageLoadingScreen from './loadingScreens/Home';
import { defaultHomepageCardsPlaceholdersAmount, loadingCls, retryingToLoadCls } from './loadingScreens/_types';
import adHocLoadingStateManager from './loadingScreens/adHocUtils/adHocLoadingStateManager';

import './styles/homepage.scss';

const DEBUGGER_LABEL = 'HomePage (React Component)';
type FilteredEntities = Pick<DbEntityMetadatas, 'id' | 'title' | 'cover'>[];
type FilteredEntitiesAdHocSumType = DbEntityMetadatas[] | FilteredEntities;

interface HomePageInnerProps {}

function kasaCardsGenerator(entities: FilteredEntities) {
  return (
    <>
      {entities.map(({ id, title, cover }) => (
        <article className="kasa-card" key={`kasa-card-${id}`}>
          <KasaCard id={id} title={title} cover={cover} />
        </article>
      ))}
    </>
  );
}

function dummyCardsGenerator(amount: number, cls: string, title: string): ReactNode {
  const elements: ReactElement[] = [];
  for (let i = 0; i < amount; i++) {
    elements.push(
      <article className={`${cls} kasa-card`} key={`kasa-dummy-card-${title}-${i}`}>
        <KasaCard title={title} />
      </article>
    );
  }

  return (
    <div className="housing-sheets-grid-gallery-wrapper">
      <section className="housing-sheets-grid-gallery">{elements}</section>
    </div>
  );
}

export function firstLoadPlaceholders(loadingState: TLoadingState): ReactElement {
  const banner = <HomepageBanner />;
  let body: ReactNode;
  if (loadingState === 'FAILED_TO_LOAD') {
    body = <ErrorBox origin={VocabAccessor('MAINTENANCE_MESSAGE')} advice={VocabAccessor('MAINTENANCE_ADVICE')} />;
  } else if (loadingState === 'LOADING') {
    body = dummyCardsGenerator(defaultHomepageCardsPlaceholdersAmount, loadingCls, VocabAccessor('HOME_PAGE_LOADING_CARDS_LABEL'));
  } else {
    body = dummyCardsGenerator(defaultHomepageCardsPlaceholdersAmount, retryingToLoadCls, VocabAccessor('HOME_PAGE_RETRYING_TO_LOAD_CARDS_LABEL'));
  }

  return (
    <>
      {banner}
      {body}
    </>
  );
}

export function componentBody(entities: FilteredEntities) {
  return (
    <>
      <div className="housing-sheets-grid-gallery-wrapper">
        <section className="housing-sheets-grid-gallery">{kasaCardsGenerator(entities)}</section>
      </div>
    </>
  );
}

export const HomePageInner: FunctionComponent<HomePageInnerProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');
  const database = useDatabase();
  let entitiesBase: DbEntityMetadatas[] = [];
  let fEntities: FilteredEntities | {} = {};

  const [filteredEntities, setFilteredEntities]: [FilteredEntitiesAdHocSumType, any] = useState(entitiesBase);
  const jsonDepsNotEqual = (): boolean => JSON.stringify(fEntities) !== JSON.stringify(filteredEntities);
  const computingFilteredEntities = (): boolean => filteredEntities.length === 0;
  useEffect(() => {
    function getFilteredEntities() {
      const ids = getDbCtxEntitiesIds(entitiesBase);
      fEntities = getDbPartialElements(entitiesBase, ids, ['title', 'cover']) as FilteredEntities;
      if (jsonDepsNotEqual()) {
        setFilteredEntities(fEntities);
      }
    }
    getFilteredEntities();
  }, [entitiesBase]);

  const adHocPlaceholder = adHocLoadingStateManager(database, firstLoadPlaceholders, HomepageLoadingScreen, {});
  if (adHocPlaceholder) {
    return adHocPlaceholder;
  }
  entitiesBase = (database as FetchResponseSchema).responseData as DbEntityMetadatas[];

  if (computingFilteredEntities()) {
    return <HomepageLoadingScreen loadingState="LOADING" cachedData={cachedDatabase()} />;
  }
  return (
    <>
      <HomepageBanner />
      {componentBody(filteredEntities)}
    </>
  );
};

export default memo(HomePageInner);
