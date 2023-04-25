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
type ResponseData = unknown;

export interface FetchResponseSchema {
  responseData: ResponseData;
  loadingState: TLoadingState;
}

interface TryToUseFetchOptions {
  maxRetry?: number;
  request?: RequestInit;
  oldResponseData?: ResponseData;
}

async function wait(ms: number) {
  if (ms < 0) {
    throw new Error('Wrong argument value: ms should be a number with a minimal value of 0');
  }
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function getFetchResponse(promise: Promise<Response>) {
  const response = await promise;
  return response;
}

function checkMaxRetryValue(n: number) {
  if (n < 1) {
    throw new Error('MaxRetry must be a positive value, with the minimal value of 1');
  }
}

export async function getData(
  initialUrlAndReq: { url: string; req?: RequestInit },
  promise: Promise<Response>,
  setStateCallbackPtr: any,
  maxRetry: number = TryUseFetchConsts.DEFAULT_MAX_FETCH_RETRY,
  _acc: number = 0
) {
  checkMaxRetryValue(maxRetry);

  async function retryGetData(
    networkError: unknown,
    promise: Promise<Response>,
    _loadingState: TLoadingState = 'RETRYING_TO_LOAD',
    _delay: number = TryUseFetchConsts.DEFAULT_DELAY_BEFORE_EACH_RETRY
  ) {
    if (++_acc < maxRetry) {
      if (_loadingState === 'RETRYING_TO_LOAD') {
        await wait(_delay);
      }
      setStateCallbackPtr((curState: FetchResponseSchema): FetchResponseSchema => ({ ...curState, loadingState: _loadingState }));
      await getData(initialUrlAndReq, promise, setStateCallbackPtr, _acc, maxRetry);
    } else {
      setStateCallbackPtr((curState: FetchResponseSchema): FetchResponseSchema => ({ ...curState, loadingState: 'FAILED_TO_LOAD' }));
      wpmDebugger(DEBUGGER_LABEL, ['Network error! Here is its dump: ', networkError], { errorCodeKey: 'IS_ERROR' });
    }
  }

  function isErrorResponse(response: Response): boolean {
    if (!response.ok) {
      return true;
    }
    const responseStatus = response.status;
    return responseStatus >= 400 && responseStatus <= 599;
  }

  try {
    const response = await getFetchResponse(promise);
    if (isErrorResponse(response)) {
      throw new Error(`Failed to fetch. HTTP status: ${response.status}.\n-> https://http.cat/${response.status}`);
    }
    try {
      const responseData = await response.json();
      setStateCallbackPtr({ responseData, loadingState: 'LOADED' });
    } catch (networkError) {
      const newPromise = fetch(initialUrlAndReq.url, initialUrlAndReq.req);
      await retryGetData(networkError, newPromise, 'LOADING');
    }
  } catch (networkError) {
    await retryGetData(networkError, promise);
  }
}

export function tryUseFetch(url: string, options?: TryToUseFetchOptions): [TLoadingState, ResponseData] {
  const maxRetry: number = options?.maxRetry || TryUseFetchConsts.DEFAULT_MAX_FETCH_RETRY;
  const req: RequestInit | undefined = options?.request;
  const oldResponseData: unknown = options?.oldResponseData || {};

  const promise = fetch(url, req);
  const initialUrlAndReq = { url, req };

  const initialData: FetchResponseSchema = { responseData: oldResponseData, loadingState: 'LOADING' };
  const [data, setData] = useState(initialData);

  useEffect(() => {
    getData(initialUrlAndReq, promise, setData, maxRetry);
  }, [url, options?.oldResponseData, options?.request]);

  return [data.loadingState, data.responseData];
}

export default tryUseFetch;
