import { FunctionComponent, useEffect, useState } from 'react';
import KasaCard from '../components/KasaCard';
import DbEntityMetadatas from '../config/MetadatasSchema';
import { useDatabase } from '../contexts/DatabaseContext';
import { FetchResponseSchema, TLoadingState } from '../dev/hooks/useFetch';
import { cachedDatabase } from '../dev/namespaces/cache';
import wpmDebugger from '../dev/wpmDebugger';
import { getDbCtxEntitiesIds, getDbPartialElements } from '../services/dbService';
import adHocLoadingStateManager from './loadingScreens/adHocLoadingStateManager';
import HomepageLoadingScreen from './loadingScreens/Home';
import './styles/homepage.scss';

const DEBUGGER_LABEL = 'HomePage (React Component)';
type FilteredEntities = Pick<DbEntityMetadatas, 'id' | 'title' | 'cover'>[];
type FilteredEntitiesAdHocSumType = DbEntityMetadatas[] | FilteredEntities;

interface HomePageInnerProps {}

function kasaCardsGenerator(entities: FilteredEntities) {
  return (
    <ul>
      {entities.map(({ id, title, cover }) => (
        <li className="kasa-card" key={id}>
          <KasaCard id={id} title={title} cover={cover} />
        </li>
      ))}
    </ul>
  );
}

export function firstLoadPlaceholders(loadingState: TLoadingState) {
  if (loadingState === 'FAILED_TO_LOAD') {
    return <p>OH C'EST TOUT CASSÉ LÀ</p>;
  } else if (loadingState === 'LOADING') {
    return <p>Loading...</p>;
  } else {
    return <p>Retrying to load...</p>;
  }
}

export function componentBody(entities: FilteredEntities) {
  return (
    <>
      <div className="cards-grid">{kasaCardsGenerator(entities)}</div>
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
    async function getFilteredEntities() {
      const ids = getDbCtxEntitiesIds(entitiesBase);
      fEntities = (await getDbPartialElements(entitiesBase, ids, ['title', 'cover'])) as FilteredEntities;
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
  return <>{componentBody(filteredEntities)}</>;
};

export default HomePageInner;
