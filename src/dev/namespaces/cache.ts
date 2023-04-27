import CachedData from './_types';

namespace Cache {
  export let databasePtr: CachedData = null;
}

export function cachedDatabase(newCache?: CachedData): CachedData | void {
  if (newCache !== undefined) {
    Cache.databasePtr = newCache;
    return;
  }
  return Cache.databasePtr;
}

export default Cache;
