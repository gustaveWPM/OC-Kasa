import { FunctionComponent, ReactElement } from 'react';
import { Navigate, Route, useParams } from 'react-router-dom';
import HousingSheet from '../components/HousingSheet';
import DbEntityMetadatas from '../config/MetadatasSchema';
import kasaPublicRoutes from '../config/router/KasaPublicRoutes';
import { useDatabase } from '../contexts/DatabaseContext';
import { FetchResponseSchema, TLoadingState } from '../dev/hooks/tryUseFetch';
import wpmDebugger from '../dev/wpmDebugger';
import { getDbEntityById } from '../services/dbService';
import adHocLoadingStateManager from './loadingScreens/adHocLoadingStateManager';
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

export function componentBody(entities: DbEntityMetadatas[], sheetId: string) {
  const entity = getDbEntityById(entities, sheetId);
  if (!entity) {
    return doRedirect(kasaPublicRoutes.NOTFOUND_PAGE);
  } else {
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

  if (sheet_id === undefined) {
    return doRedirect(kasaPublicRoutes.HOME_PAGE);
  }

  const adHocPlaceholder = adHocLoadingStateManager(database, firstLoadPlaceholders, HousingSheetLoadingScreen, { sheetId: sheet_id });
  if (adHocPlaceholder) {
    return adHocPlaceholder;
  }

  const castedData = database as FetchResponseSchema;
  return <>{componentBody(castedData.responseData as DbEntityMetadatas[], sheet_id)}</>;
};

export function getRouteParams(): ReactElement {
  return (
    <>
      <Route path=":sheet_id" element={<HousingSheetsInner />} />
    </>
  );
}

export default HousingSheetsInner;
