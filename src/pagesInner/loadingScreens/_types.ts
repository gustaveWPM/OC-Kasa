import { Attributes, ReactElement } from 'react';
import { TLoadingState } from '../../dev/hooks/tryUseFetch';
import CachedData from '../../dev/namespaces/_types';

export interface LoadingScreenPropsBase {
  loadingState: TLoadingState;
  cachedData: CachedData;
}

export type ReactExpectedProps<T> = Attributes & T;
export type AdHocLoadingStateManagerExpectedProps<T> = Omit<ReactExpectedProps<T>, keyof LoadingScreenPropsBase>;
export type AdHocLoadingStateManagerPlaceholdersFnPtr = (v: TLoadingState) => ReactElement;
