import { createContext, FunctionComponent, ReactNode, useContext, useEffect, useState } from 'react';
import { getData } from '../dev/hooks/tryUseFetch';
import { DB_FETCH_ENDPOINT } from '../dev/hooks/_conf/consts';
import { getCachedDatabase, updateCachedDatabase } from '../dev/namespaces/cache';
import { CachedData } from '../dev/namespaces/_types';
import wpmDebugger from '../dev/wpmDebugger';

const DEBUGGER_LABEL = 'DatabaseContext (React Context)';

const DatabaseContext = createContext<CachedData>(getCachedDatabase());

interface DatabaseProviderProps {
  children: ReactNode;
}

const databasePromise = fetch(DB_FETCH_ENDPOINT);
export const DatabaseProvider: FunctionComponent<DatabaseProviderProps> = ({ children }) => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');
  const [data, setData] = useState(getCachedDatabase());

  useEffect(() => {
    async function dataFetch() {
      await getData({ url: DB_FETCH_ENDPOINT }, databasePromise, setData);
    }
    dataFetch();
  }, []);

  const dataLoadingStateAsDeps = [data && data.loadingState];
  useEffect(() => {
    function processCacheUpdate() {
      if (data && data.loadingState === 'LOADED') {
        updateCachedDatabase(data);
      }
    }
    processCacheUpdate();
  }, dataLoadingStateAsDeps);

  return <DatabaseContext.Provider value={data}>{children}</DatabaseContext.Provider>;
};

export const useDatabase = () => useContext(DatabaseContext);
