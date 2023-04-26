import { FetchResponseSchema } from '../hooks/tryUseFetch';

export type CachedData = FetchResponseSchema | undefined;

enum CacheCtx {
  CACHE_CTX,
  NOT_CACHE_CTX
}

export type CacheCtxKey = keyof typeof CacheCtx;
