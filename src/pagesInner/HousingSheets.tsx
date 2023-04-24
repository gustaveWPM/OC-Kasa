import { FunctionComponent, memo, ReactElement, useEffect, useState } from 'react';
import { Link, Navigate, Route, useNavigate, useParams } from 'react-router-dom';
import DbEntityMetadatas from '../config/metadatasSchema';
import kasaPublicRoutes from '../config/router/KasaPublicRoutes';
import { useFreshDatabaseContext } from '../contexts/DatabaseContext';
import wpmDebugger from '../dev/wpmDebugger';
import { getDbEntityById } from '../services/dbService';
import { setPageTitle, weakPageTitleBuilder } from './_PageEffects';

const DEBUGGER_LABEL = 'Housing Sheets (React Component)';

interface HousingSheetsInnerProps {}

export const HousingSheetsInner: FunctionComponent<HousingSheetsInnerProps> = () => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');

  let { sheet_id } = useParams();
  const ctx = useFreshDatabaseContext();
  const navigate = useNavigate();

  const [dbEntity, setDbEntity]: [DbEntityMetadatas | {}, any] = useState({});

  useEffect(() => {
    if (sheet_id && ctx.loadingState === 'FAILED_TO_LOAD') {
      wpmDebugger(DEBUGGER_LABEL, 'La base de données il est TOUT CASSÉ', { errorCodeKey: 'IS_ERROR' });
    }
    if (sheet_id && ctx.loadingState === 'LOADED') {
      const currentEntity = getDbEntityById(ctx, sheet_id);
      if (currentEntity === null) {
        setDbEntity({});
        navigate(kasaPublicRoutes.NOTFOUND_PAGE);
        return;
      }
      setDbEntity(currentEntity);
      const castedDbEntity = dbEntity as DbEntityMetadatas;
      if (castedDbEntity.title) {
        setPageTitle(weakPageTitleBuilder(castedDbEntity.title));
      }
    }
  }, [(dbEntity as DbEntityMetadatas).id, ctx, ctx.loadingState]);

  function buildSheet(id?: string): ReactElement {
    if (id === undefined) {
      return <Navigate to={kasaPublicRoutes.HOME_PAGE} replace />;
    }
    const metadatas = dbEntity as DbEntityMetadatas;
    return (
      <>
        <p>{metadatas.id}</p>
        <p>{metadatas.title}</p>
        <p>{metadatas.cover}</p>
        <p>{metadatas.pictures}</p>
        <p>{metadatas.description}</p>
        <p>{metadatas.rating}</p>
        <Link to="/">test</Link>
      </>
    );
  }

  return <>{buildSheet(sheet_id)}</>;
};

export function getRouteParams(): ReactElement {
  return (
    <>
      <Route path=":sheet_id" element={<HousingSheetsInner />} />
    </>
  );
}

export default memo(HousingSheetsInner);
