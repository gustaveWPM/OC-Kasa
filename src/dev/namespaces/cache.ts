import { CachedData } from './_types';

namespace Cache {
  export let databasePtr: CachedData = undefined;
}

export function updateCachedDatabase(newCache: CachedData) {
  Cache.databasePtr = newCache;
}

export function getCachedDatabase(): CachedData {
  return Cache.databasePtr;
}

export default Cache;
