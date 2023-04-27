import { FunctionComponent, memo, ReactElement } from 'react';
import { Navigate, Route, useParams } from 'react-router-dom';
import HousingSheet from '../components/HousingSheet';
import DbEntityMetadatas from '../config/metadatasSchema';
import kasaPublicRoutes from '../config/router/KasaPublicRoutes';
import { useDatabase } from '../contexts/DatabaseContext';
import { FetchResponseSchema, TLoadingState } from '../dev/hooks/tryUseFetch';
import { getCachedDatabase } from '../dev/namespaces/cache';
import { CacheCtxKey } from '../dev/namespaces/_types';
import wpmDebugger from '../dev/wpmDebugger';
import { getDbEntityById } from '../services/dbService';
import HousingSheetLoadingScreen from './loadingScreens/HousingSheets';

const DEBUGGER_LABEL = 'Housing Sheets (React Component)';

function doRedirect(route: string) {
  return <Navigate to={route} replace />;
}

interface HousingSheetsInnerProps {}

export function firstLoadPlaceholders(loadingState: TLoadingState) {
  if (loadingState === 'FAILED_TO_LOAD') {
    return <p>OH C'EST TOUT CASSÉ LÀ</p>;
  } else if (loadingState === 'LOADING') {
    return <p>Loading...</p>;
  } else {
    return <p>Retrying to load...</p>;
  }
}

export function componentBody(entities: DbEntityMetadatas[], sheetId: string, cacheCtx: CacheCtxKey) {
  const entity: DbEntityMetadatas = getDbEntityById(entities, sheetId) as DbEntityMetadatas;
  if (entity === null) {
    if (cacheCtx === 'NOT_CACHE_CTX') {
      return doRedirect(kasaPublicRoutes.NOTFOUND_PAGE);
    } else if (cacheCtx === 'CACHE_CTX') {
      return firstLoadPlaceholders('LOADING');
    }
  }

  return (
    <>
      <HousingSheet
        title={entity.title}
        cover={entity.cover}
        pictures={entity.pictures}
        description={entity.description}
        host={entity.host}
        rating={entity.rating}
        location={entity.location}
        equipments={entity.equipments}
        tags={entity.tags}
      />
    </>
  );
}

export const HousingSheetsInner: FunctionComponent<HousingSheetsInnerProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');
  const database = useDatabase();
  const { sheet_id } = useParams();

  if (sheet_id === undefined) {
    return doRedirect(kasaPublicRoutes.HOME_PAGE);
  }
  if (database === undefined) {
    return <HousingSheetLoadingScreen loadingState={'LOADING'} cachedData={getCachedDatabase()} sheetId={sheet_id} />;
  }
  const castedData = database as FetchResponseSchema;
  if (castedData.loadingState !== 'LOADED') {
    return <HousingSheetLoadingScreen loadingState={castedData.loadingState} cachedData={getCachedDatabase()} sheetId={sheet_id} />;
  }

  return <>{componentBody(castedData.responseData as DbEntityMetadatas[], sheet_id, 'NOT_CACHE_CTX')}</>;
};

export function getRouteParams(): ReactElement {
  return (
    <>
      <Route path=":sheet_id" element={<HousingSheetsInner />} />
    </>
  );
}

export default memo(HousingSheetsInner);
