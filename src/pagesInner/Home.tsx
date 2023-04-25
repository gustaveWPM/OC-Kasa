import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import DbEntityMetadatas from '../config/metadatasSchema';
import { useDatabase } from '../contexts/DatabaseContext';
import { FetchResponseSchema, TLoadingState } from '../dev/hooks/tryUseFetch';
import { getCachedDatabase } from '../dev/namespaces/cache';
import { CachedData } from '../dev/namespaces/_types';
import wpmDebugger from '../dev/wpmDebugger';
import { getDbCtxEntitiesIds, getDbPartialElements } from '../services/dbService';
import './styles/homepage.scss';

const DEBUGGER_LABEL = 'HomePage (React Component)';

interface HomePageInnerProps {}

interface HomepageLoadingScreenProps {
  loadingState: TLoadingState;
  cachedData: CachedData;
}

function kasaCardsGenerator(entities: DbEntityMetadatas[]) {
  const ids = getDbCtxEntitiesIds(entities);
  const filteredEntities = getDbPartialElements(entities, ids, ['title', 'cover']);
  return (
    <ul>
      {filteredEntities.map(({ id, title, cover }) => (
        <li key={id}>
          title: {title}; cover: {cover}
        </li>
      ))}
    </ul>
  );
}

function componentBody(entities: DbEntityMetadatas[]) {
  return (
    <>
      <div className="sidebar sidebar-base">{kasaCardsGenerator(entities)}</div>
      <br></br>
      <hr />
      <Link to="/about-us">TEST</Link>
    </>
  );
}

const HomepageLoadingScreen: FunctionComponent<HomepageLoadingScreenProps> = ({ loadingState, cachedData }) => {
  if (cachedData === undefined) {
    // * ... First-load placeholders
    if (loadingState === 'FAILED_TO_LOAD') {
      return <p>OH C'EST TOUT CASSÉ LÀ</p>;
    } else if (loadingState === 'LOADING') {
      return <p>Loading...</p>;
    } else {
      return <p>Retrying to load...</p>;
    }
  } else {
    return <div style={{ opacity: 0.5 }}>{componentBody(cachedData.responseData as DbEntityMetadatas[])}</div>;
  }
};

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
