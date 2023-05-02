import { VocabStrings } from '../../config/vocab/Vocab';
import { getCurrentUserVocabLanguageSymbol } from '../../config/vocab/VocabAccessor';
import CachedData from './_types';

type i18nCache = {
  [Property in keyof VocabStrings]: CachedData;
};

namespace Cache {
  export let databasePtr: i18nCache = { fr: null, 'en-us': null };
}

function cacheAccessor(newCache?: CachedData) {
  if (newCache) {
    Cache.databasePtr[getCurrentUserVocabLanguageSymbol()] = newCache;
  }
  return Cache.databasePtr[getCurrentUserVocabLanguageSymbol()];
}

export function cachedDatabase(newCache?: CachedData): CachedData {
  return cacheAccessor(newCache);
}

export default cachedDatabase;
