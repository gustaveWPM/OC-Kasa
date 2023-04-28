import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Navigate, Route, useParams } from 'react-router-dom';
import HousingSheet from '../components/HousingSheet';
import DbEntityMetadatas from '../config/MetadatasSchema';
import kasaPublicRoutes from '../config/router/KasaPublicRoutes';
import { useDatabase } from '../contexts/DatabaseContext';
import { FetchResponseSchema, TLoadingState } from '../dev/hooks/useFetch';
import { cachedDatabase } from '../dev/namespaces/cache';
import wpmDebugger from '../dev/wpmDebugger';
import { getDbEntityById, GetDbEntityByIdResult, GetDbEntityByIdSuccessfulResult } from '../services/dbService';
import adHocLoadingStateManager from './loadingScreens/adHocLoadingStateManager';
import HousingSheetLoadingScreen from './loadingScreens/HousingSheets';

const DEBUGGER_LABEL = 'Housing Sheets (React Component)';
type FilteredEntityAdHocSumType = DbEntityMetadatas | {};
type EntityOrMaybeEntitiesAdHocSumType = GetDbEntityByIdResult | DbEntityMetadatas[];

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

export function componentBody(entityOrMaybeEntities: EntityOrMaybeEntitiesAdHocSumType, sheetIdForCacheRuntimeCtx?: string) {
  const cacheCtx = sheetIdForCacheRuntimeCtx !== undefined;

  let entityOrMaybeJITEntity: EntityOrMaybeEntitiesAdHocSumType = null;
  if (cacheCtx) {
    const entities = entityOrMaybeEntities as DbEntityMetadatas[];
    entityOrMaybeJITEntity = getDbEntityById(entities, sheetIdForCacheRuntimeCtx);
  } else {
    entityOrMaybeJITEntity = entityOrMaybeEntities as GetDbEntityByIdResult;
  }
  if (!entityOrMaybeJITEntity) {
    return doRedirect(kasaPublicRoutes.NOTFOUND_PAGE);
  } else {
    const entity = entityOrMaybeJITEntity as GetDbEntityByIdSuccessfulResult;
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
}

export const HousingSheetsInner: FunctionComponent<HousingSheetsInnerProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');
  const database = useDatabase();
  const { sheet_id } = useParams();
  let entitiesBase: DbEntityMetadatas[] = [];
  let fEntity: GetDbEntityByIdResult | {} = {};

  const [filteredEntity, setFilteredEntity]: [FilteredEntityAdHocSumType, any] = useState(fEntity);
  const jsonDepsNotEqual = (): boolean => JSON.stringify(fEntity) !== JSON.stringify(filteredEntity);
  const computingFilteredEntity = (): boolean => filteredEntity !== null && Object.keys(filteredEntity).length === 0;
  const fetchingDatabase = (): boolean => entitiesBase.length === 0;
  useEffect(() => {
    function getFilteredEntity() {
      fEntity = getDbEntityById(entitiesBase, sheet_id as string);
      if (jsonDepsNotEqual()) {
        setFilteredEntity(fEntity);
      }
    }
    const cancelCurrentEffectCtx = sheet_id === undefined || fetchingDatabase();
    if (!cancelCurrentEffectCtx) {
      getFilteredEntity();
    }
  }, [entitiesBase]);

  if (sheet_id === undefined) {
    return doRedirect(kasaPublicRoutes.HOME_PAGE);
  }

  const adHocPlaceholder = adHocLoadingStateManager(database, firstLoadPlaceholders, HousingSheetLoadingScreen, { sheetId: sheet_id });
  if (adHocPlaceholder) {
    return adHocPlaceholder;
  }
  entitiesBase = (database as FetchResponseSchema).responseData as DbEntityMetadatas[];

  if (computingFilteredEntity()) {
    return <HousingSheetLoadingScreen loadingState="LOADING" cachedData={cachedDatabase()} sheetId={sheet_id} />;
  }

  return <>{componentBody(filteredEntity as GetDbEntityByIdResult)}</>;
};

export function getRouteParams(): ReactElement {
  return (
    <>
      <Route path=":sheet_id" element={<HousingSheetsInner />} />
    </>
  );
}

export default HousingSheetsInner;
