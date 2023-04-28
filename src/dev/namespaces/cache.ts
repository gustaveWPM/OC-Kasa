import CachedData from './_types';

namespace Cache {
  export let databasePtr: CachedData = null;
}

export function cachedDatabase(newCache?: CachedData): CachedData {
  if (newCache !== undefined) {
    Cache.databasePtr = newCache;
  }
  return Cache.databasePtr;
}

export default Cache;
