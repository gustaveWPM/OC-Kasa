import type { Attributes, ReactElement } from 'react';
import type { TLoadingState } from '../../dev/hooks/useFetch';
import type CachedData from '../../dev/namespaces/_types';

export interface LoadingScreenPropsBase {
  loadingState: TLoadingState;
  cachedData: CachedData;
}

export type ReactExpectedProps<T> = Attributes & T;
export type AdHocLoadingStateManagerExpectedProps<T> = Omit<ReactExpectedProps<T>, keyof LoadingScreenPropsBase>;
export type AdHocLoadingStateManagerPlaceholdersFnPtr = (v: TLoadingState) => ReactElement;

export const DEFAULT_HOMEPAGE_CARDS_PLACEHOLDERS_AMOUNT: number = 20;
export const LOADING_CLS: string = 'loading';
export const RETRYING_TO_LOAD_CLS: string = 'retrying-to-load';
