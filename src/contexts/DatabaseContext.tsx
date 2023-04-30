import { createContext, FunctionComponent, ReactNode, useContext, useEffect, useState } from 'react';
import { getDbFetchEndpoint } from '../config/vocab/VocabAccessor';
import { useGetData } from '../dev/hooks/useFetch';
import { cachedDatabase } from '../dev/namespaces/cache';
import CachedData from '../dev/namespaces/_types';
import wpmDebugger from '../dev/wpmDebugger';

const DEBUGGER_LABEL = 'DatabaseContext (React Context)';
const DatabaseContext = createContext<CachedData>(cachedDatabase());

interface DatabaseProviderProps {
  children: ReactNode;
}

const getUrl = () => getDbFetchEndpoint();
const databasePromise = fetch(getUrl());
export const DatabaseProvider: FunctionComponent<DatabaseProviderProps> = ({ children }) => {
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');
  const [data, setData] = useState(cachedDatabase());

  useEffect(() => {
    async function dataFetch() {
      await useGetData({ url: getUrl() }, databasePromise, setData);
    }
    dataFetch();
  }, []);

  const dataLoadingStateAsDeps = [data?.loadingState];
  useEffect(() => {
    function processCacheUpdate() {
      if (data) {
        if (data.loadingState === 'LOADED') {
          const cache: CachedData = { ...data, loadingState: 'LOADING' };
          cachedDatabase(cache);
        } else if (data.loadingState === 'FAILED_TO_LOAD') {
          const invalidatedCache: CachedData = { ...data, loadingState: 'EXPIRED' };
          cachedDatabase(invalidatedCache);
        }
      }
    }
    processCacheUpdate();
  }, dataLoadingStateAsDeps);

  return <DatabaseContext.Provider value={data}>{children}</DatabaseContext.Provider>;
};

export const useDatabase = () => useContext(DatabaseContext);
