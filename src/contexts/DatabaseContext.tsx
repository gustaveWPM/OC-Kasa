import { createContext, FunctionComponent, ReactNode, useContext, useEffect, useState } from 'react';
import { getDbFetchEndpoint } from '../config/vocab/VocabAccessor';
import { useGetData } from '../dev/hooks/useFetch';
import { cachedDatabase } from '../dev/namespaces/cache';
import CachedData from '../dev/namespaces/_types';
import wpmDebugger from '../dev/wpmDebugger';
import { useAppContext } from './AppContext';

const DEBUGGER_LABEL = 'DatabaseContext (React Context)';
const DatabaseContext = createContext<CachedData>(cachedDatabase());

interface DatabaseProviderProps {
  children: ReactNode;
}

let stateMutatorPtr = 0;

const getUrl = () => getDbFetchEndpoint();
export const DatabaseProvider: FunctionComponent<DatabaseProviderProps> = ({ children }) => {
  const databasePromise = fetch(getUrl());
  wpmDebugger(DEBUGGER_LABEL, 'Rendered!');
  const { state } = useAppContext();
  const [data, setData] = useState(cachedDatabase());

  useEffect(() => {
    async function dataFetch() {
      await useGetData({ url: getUrl() }, databasePromise, setData);
    }
    dataFetch();
  }, [state]);

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
