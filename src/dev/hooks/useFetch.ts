import wpmDebugger from '../wpmDebugger';
import { UseFetchConsts } from './_conf/consts';

const DEBUGGER_LABEL = 'useFetch';

export enum ELoadingState {
  LOADING,
  LOADED,
  RETRYING_TO_LOAD,
  FAILED_TO_LOAD,
  EXPIRED
}

export type TLoadingState = keyof typeof ELoadingState;
type ResponseData = unknown;
type InitialUrlAndReq = { url: string; req?: RequestInit };

export interface FetchResponseSchema {
  responseData: ResponseData;
  loadingState: TLoadingState;
}

interface TryToUseFetchOptions {
  maxRetry?: number;
  request?: RequestInit;
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

export async function useGetData(
  initialUrlAndReq: InitialUrlAndReq,
  promise: Promise<Response>,
  setStateFnPtr: Function,
  maxRetry: number = UseFetchConsts.DEFAULT_MAX_FETCH_RETRY,
  delayBeforeEachRetry: number = UseFetchConsts.DEFAULT_DELAY_BEFORE_EACH_RETRY
) {
  function throwIfNotGreaterOrEqualThan(n: number, x: number, vLabel: string) {
    if (n <= x) {
      throw new Error(`${vLabel} must have a minimal value of ${x}. (Current value: ${n})`);
    }
  }

  function isErrorResponse(response: Response): boolean {
    if (!response.ok) {
      return true;
    }
    const responseStatus = response.status;
    return responseStatus >= 400 && responseStatus <= 599;
  }

  throwIfNotGreaterOrEqualThan(maxRetry, 1, 'maxRetry');
  throwIfNotGreaterOrEqualThan(delayBeforeEachRetry, 1, 'delayBeforeEachRetry');

  let currentPromise = promise;
  let dontWait = false;

  const resetCurrentPromise = () => (currentPromise = fetch(initialUrlAndReq.url, initialUrlAndReq.req));
  const doBreak = (i: number) => !(i <= maxRetry);
  for (let i: number = 0; !doBreak(i); i++) {
    try {
      const response = await getFetchResponse(currentPromise);
      if (isErrorResponse(response)) {
        throw new Error(`Failed to fetch. HTTP status: ${response.status}.\n-> https://http.cat/${response.status}`);
      }
      try {
        const responseData = await response.json();
        setStateFnPtr({ responseData, loadingState: 'LOADED' });
        break;
      } catch (networkError) {
        resetCurrentPromise();
        dontWait = true;
        throw networkError;
      }
    } catch (networkError) {
      if (!doBreak(i + 1)) {
        if (dontWait) {
          setStateFnPtr((curState: FetchResponseSchema): FetchResponseSchema => ({ ...curState, loadingState: 'LOADING' }));
        } else {
          resetCurrentPromise();
          setStateFnPtr((curState: FetchResponseSchema): FetchResponseSchema => ({ ...curState, loadingState: 'RETRYING_TO_LOAD' }));
          await wait(delayBeforeEachRetry);
        }
      } else {
        setStateFnPtr((curState: FetchResponseSchema): FetchResponseSchema => ({ ...curState, loadingState: 'FAILED_TO_LOAD' }));
        wpmDebugger(DEBUGGER_LABEL, ['Network error! Here is its dump: ', networkError], { errorCodeKey: 'IS_ERROR' });
      }
    }
  }
}

export async function useFetch(url: string, setStateFnPtr: Function, options?: TryToUseFetchOptions) {
  const req: RequestInit | undefined = options?.request;
  const promise = fetch(url, req);

  const initialUrlAndReq = { url, req };
  const maxRetry: number = options?.maxRetry || UseFetchConsts.DEFAULT_MAX_FETCH_RETRY;

  await useGetData(initialUrlAndReq, promise, setStateFnPtr, maxRetry);
}

export default useFetch;
