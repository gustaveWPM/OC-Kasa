import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { Navigate, Route, useParams } from 'react-router-dom';
import ErrorBox from '../components/ErrorBox';
import HousingSheet from '../components/HousingSheet';
import DbEntityMetadatas from '../config/MetadatasSchema';
import kasaPublicRoutes from '../config/router/KasaPublicRoutes';
import { VocabAccessor, i18nRouteAccessor } from '../config/vocab/VocabAccessor';
import { useDatabase } from '../contexts/DatabaseContext';
import { FetchResponseSchema, TLoadingState } from '../dev/hooks/useFetch';
import cachedDatabase from '../dev/namespaces/cache';
import wpmDebugger from '../dev/wpmDebugger';
import { GetDbEntityByIdResult, GetDbEntityByIdSuccessfulResult, getDbEntityById } from '../services/dbService';
import DummyHousingSheet from './DummyHousingSheets';
import HousingSheetLoadingScreen from './loadingScreens/HousingSheets';
import { loadingCls, retryingToLoadCls } from './loadingScreens/_types';
import adHocLoadingStateManager from './loadingScreens/adHocUtils/adHocLoadingStateManager';

import './styles/housingSheets.scss';

const DEBUGGER_LABEL = 'Housing Sheets (React Component)';
type FilteredEntityAdHocSumType = DbEntityMetadatas | {};
type EntityOrMaybeEntitiesAdHocSumType = GetDbEntityByIdResult | DbEntityMetadatas[];

function doRedirect(route: string) {
  return <Navigate to={route} replace />;
}

interface HousingSheetsInnerProps {}

export function firstLoadPlaceholders(loadingState: TLoadingState) {
  if (loadingState === 'FAILED_TO_LOAD') {
    return <ErrorBox origin={VocabAccessor('MAINTENANCE_MESSAGE')} advice={VocabAccessor('MAINTENANCE_ADVICE')} />;
  } else if (loadingState === 'LOADING') {
    return <DummyHousingSheet cls={loadingCls} loadingPlaceholder={VocabAccessor('HOME_PAGE_LOADING_CARDS_LABEL')} />;
  } else {
    return <DummyHousingSheet cls={retryingToLoadCls} loadingPlaceholder={VocabAccessor('HOME_PAGE_RETRYING_TO_LOAD_CARDS_LABEL')} />;
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
      <div className="housing-sheets-page-wrapper">
        <HousingSheet
          title={entity.title}
          pictures={entity.pictures}
          description={entity.description}
          host={entity.host}
          rating={entity.rating}
          location={entity.location}
          equipments={entity.equipments}
          tags={entity.tags}
        />
      </div>
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

  useEffect(() => {
    function uglyWorkaround() {
      const ONLOAD_CLS = 'onload-side-effects';
      const elementsToPlayWith = document.querySelectorAll('.accordion-item, .accordion-item-container');
      elementsToPlayWith.forEach((element) => element.classList.add(ONLOAD_CLS));

      setTimeout(() => {
        const elements = document.querySelectorAll('.' + ONLOAD_CLS);
        elements.forEach((element) => element.classList.remove(ONLOAD_CLS));
      }, 350);
    }
    uglyWorkaround();
  });

  if (sheet_id === undefined) {
    return doRedirect(i18nRouteAccessor(kasaPublicRoutes.HOME_PAGE));
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
