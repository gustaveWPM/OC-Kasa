import type { VocabStrings } from '../../config/vocab/Vocab';
import { getCurrentUserVocabLanguageSymbol } from '../../config/vocab/VocabAccessor';
import type CachedData from './_types';

type i18nCache = {
  [Property in keyof VocabStrings]: CachedData;
};

namespace Cache {
  export const databasePtr: i18nCache = { fr: null, 'en-us': null };
}

function cacheAccessor(newCache?: CachedData) {
  if (newCache) {
    Cache.databasePtr[getCurrentUserVocabLanguageSymbol()] = newCache;
  }
  return Cache.databasePtr[getCurrentUserVocabLanguageSymbol()];
}

export const cachedDatabase = (newCache?: CachedData): CachedData => cacheAccessor(newCache);
export default cachedDatabase;
