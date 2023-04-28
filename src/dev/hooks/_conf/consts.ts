export namespace UseFetchConsts {
  const TOTAL_RETRIES_DURATION = 1500;
  export const DEFAULT_MAX_FETCH_RETRY = 5;
  export const DEFAULT_DELAY_BEFORE_EACH_RETRY = TOTAL_RETRIES_DURATION / DEFAULT_MAX_FETCH_RETRY;
}

export const DB_FETCH_ENDPOINT = '/logements.json';
