import { createContext, useCallback, useContext } from 'react';
import DbEntityMetadatas from '../config/metadatasSchema';
import tryUseFetch, { TLoadingState } from '../dev/hooks/tryUseFetch';
import { DB_FETCH_ENDPOINT } from '../dev/hooks/_conf/consts';
import wpmDebugger from '../dev/wpmDebugger';

type UnloadedDbRepresentation = [];
type DbRepresentation = DbEntityMetadatas[] | UnloadedDbRepresentation;
const dbRepresentationInitialState: UnloadedDbRepresentation = [];
const DEBUGGER_LABEL = 'Database Context';

export interface DbContext {
  loadingState: TLoadingState;
  dbRepresentation: DbRepresentation | UnloadedDbRepresentation;
}

export const dbInitialContext: DbContext = {
  loadingState: 'LOADING',
  dbRepresentation: dbRepresentationInitialState
};

export let DatabaseContext = createContext<DbContext>(dbInitialContext);

export function useFreshDatabaseContext() {
  const currentCtx: DbContext = useContext(DatabaseContext);
  const [loadingState, db] = tryUseFetch(DB_FETCH_ENDPOINT);
  const doUseFreshDatabaseContext = useCallback(() => {
    const loadState: TLoadingState = loadingState;
    if (loadState === 'FAILED_TO_LOAD') {
      wpmDebugger(DEBUGGER_LABEL, 'La base de données il est TOUT CASSÉ', { errorCodeKey: 'IS_ERROR' });
    }
    if (loadState === 'LOADED') {
      const freshCtx = { ...currentCtx, loadingState: loadState, dbRepresentation: db };
      DatabaseContext = createContext<DbContext>(freshCtx);
    }
    return useContext(DatabaseContext);
  }, [loadingState, db]);
  return doUseFreshDatabaseContext();
}

export default DatabaseContext;
