import { FunctionComponent } from 'react';
import KasaCard from '../components/KasaCard';
import DbEntityMetadatas from '../config/MetadatasSchema';
import { useDatabase } from '../contexts/DatabaseContext';
import { FetchResponseSchema, TLoadingState } from '../dev/hooks/tryUseFetch';
import wpmDebugger from '../dev/wpmDebugger';
import { getDbCtxEntitiesIds, getDbPartialElements } from '../services/dbService';
import adHocLoadingStateManager from './loadingScreens/adHocLoadingStateManager';
import HomepageLoadingScreen from './loadingScreens/Home';
import './styles/homepage.scss';

const DEBUGGER_LABEL = 'HomePage (React Component)';
type FilteredEntities = { id: string; title: string; cover: string }[];

interface HomePageInnerProps {}

function kasaCardsGenerator(entities: DbEntityMetadatas[]) {
  const ids = getDbCtxEntitiesIds(entities);
  const filteredEntities: FilteredEntities = getDbPartialElements(entities, ids, ['title', 'cover']) as FilteredEntities;
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

  const adHocPlaceholder = adHocLoadingStateManager(database, firstLoadPlaceholders, HomepageLoadingScreen, {});
  if (adHocPlaceholder) {
    return adHocPlaceholder;
  }
  const castedData = database as FetchResponseSchema;
  return <>{componentBody(castedData.responseData as DbEntityMetadatas[])}</>;
};

export default HomePageInner;
