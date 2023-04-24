import { useEffect, useState } from 'react';
import wpmDebugger from '../wpmDebugger';
import { TryUseFetchConsts } from './_conf/consts';

const DEBUGGER_LABEL = 'tryUseFetch';

export enum ELoadingState {
  LOADING,
  LOADED,
  RETRYING_TO_LOAD,
  FAILED_TO_LOAD
}

export type TLoadingState = keyof typeof ELoadingState;
type ResponseData = any;

export interface FetchResponseSchema {
  responseData: ResponseData;
  loadingState: TLoadingState;
}

interface TryToUseFetchOptions {
  maxRetry?: number;
  request?: RequestInit;
  oldResponseData?: ResponseData;
}

export function tryUseFetch(url: string, options?: TryToUseFetchOptions): [TLoadingState, ResponseData] {
  function isErrorResponse(responseStatus: number): boolean {
    return responseStatus >= 400 && responseStatus <= 599;
  }

  const oldResponseData: any = options?.oldResponseData || {};
  const maxRetry: number = options?.maxRetry || TryUseFetchConsts.DEFAULT_MAX_FETCH_RETRY;
  const req: RequestInit | undefined = options?.request;

  const initialData: FetchResponseSchema = { responseData: oldResponseData, loadingState: 'LOADING' };
  const [state, setState] = useState(initialData);

  useEffect(() => {
    async function getState(_acc: number = 0, _max: number = maxRetry) {
      try {
        const response = await fetch(url, req);
        if (isErrorResponse(response.status)) {
          throw new Error(`Failed to fetch. HTTP status: ${response.status}.\n-> https://http.cat/${response.status}`);
        }
        const responseData = await response.json();
        setState({ responseData, loadingState: 'LOADED' });
      } catch (networkError) {
        if (++_acc < _max) {
          setState((curState: FetchResponseSchema): FetchResponseSchema => ({ ...curState, loadingState: 'RETRYING_TO_LOAD' }));
          await getState(_acc, _max);
        } else {
          setState((curState: FetchResponseSchema): FetchResponseSchema => ({ ...curState, loadingState: 'FAILED_TO_LOAD' }));
          wpmDebugger(DEBUGGER_LABEL, ['Network error! Here is its dump: ', networkError], { errorCodeKey: 'IS_ERROR' });
        }
      }
    }
    getState();
  }, [url, options?.oldResponseData, options?.request]);

  return [state.loadingState, state.responseData];
}

export default tryUseFetch;
