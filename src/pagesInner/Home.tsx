import { FunctionComponent } from 'react';
import KasaCard from '../components/KasaCard';
import DbEntityMetadatas from '../config/metadatasSchema';
import { useDatabase } from '../contexts/DatabaseContext';
import { FetchResponseSchema, TLoadingState } from '../dev/hooks/tryUseFetch';
import { getCachedDatabase } from '../dev/namespaces/cache';
import wpmDebugger from '../dev/wpmDebugger';
import { getDbCtxEntitiesIds, getDbPartialElements } from '../services/dbService';
import HomepageLoadingScreen from './loadingScreens/Home';
import './styles/homepage.scss';

const DEBUGGER_LABEL = 'HomePage (React Component)';

type FilteredElement = { id: string; title: string; cover: string }[];

interface HomePageInnerProps {}

function kasaCardsGenerator(entities: DbEntityMetadatas[]) {
  const ids = getDbCtxEntitiesIds(entities);
  const filteredEntities: FilteredElement = getDbPartialElements(entities, ids, ['title', 'cover']) as FilteredElement;
  return (
    <ul>
      {filteredEntities.map(({ id, title, cover }) => (
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

export function componentBody(entities: DbEntityMetadatas[]) {
  return (
    <>
      <div className="cards-grid">{kasaCardsGenerator(entities)}</div>
    </>
  );
}

export const HomePageInner: FunctionComponent<HomePageInnerProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');
  const database = useDatabase();

  if (database === undefined) {
    return <HomepageLoadingScreen loadingState={'LOADING'} cachedData={getCachedDatabase()} />;
  }
  const castedData = database as FetchResponseSchema;
  if (castedData.loadingState !== 'LOADED') {
    return <HomepageLoadingScreen loadingState={castedData.loadingState} cachedData={getCachedDatabase()} />;
  }

  return <>{componentBody(castedData.responseData as DbEntityMetadatas[])}</>;
};

export default HomePageInner;
