import { createContext, FunctionComponent, ReactNode, useContext, useEffect, useState } from 'react';
import { useGetData } from '../dev/hooks/useFetch';
import { DB_FETCH_ENDPOINT } from '../dev/hooks/_conf/consts';
import { cachedDatabase } from '../dev/namespaces/cache';
import CachedData from '../dev/namespaces/_types';
import wpmDebugger from '../dev/wpmDebugger';

const DEBUGGER_LABEL = 'DatabaseContext (React Context)';

const DatabaseContext = createContext<CachedData>(cachedDatabase());

interface DatabaseProviderProps {
  children: ReactNode;
}

const databasePromise = fetch(DB_FETCH_ENDPOINT);
export const DatabaseProvider: FunctionComponent<DatabaseProviderProps> = ({ children }) => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');
  const [data, setData] = useState(cachedDatabase());

  useEffect(() => {
    async function dataFetch() {
      await useGetData({ url: DB_FETCH_ENDPOINT }, databasePromise, setData);
    }
    dataFetch();
  }, []);

  const dataLoadingStateAsDeps = [data && data.loadingState];
  useEffect(() => {
    function processCacheUpdate() {
      if (data) {
        if (data.loadingState === 'LOADED') {
          cachedDatabase(data);
        } else if (data.loadingState === 'FAILED_TO_LOAD') {
          cachedDatabase(null);
        }
      }
    }
    processCacheUpdate();
  }, dataLoadingStateAsDeps);

  return <DatabaseContext.Provider value={data}>{children}</DatabaseContext.Provider>;
};

export const useDatabase = () => useContext(DatabaseContext);
