import { createElement, FunctionComponent, ReactElement } from 'react';
import { FetchResponseSchema, TLoadingState } from '../../dev/hooks/useFetch';
import { cachedDatabase } from '../../dev/namespaces/cache';
import CachedData from '../../dev/namespaces/_types';

import {
  AdHocLoadingStateManagerExpectedProps as ExpectedProps,
  AdHocLoadingStateManagerPlaceholdersFnPtr as PlaceholdersFnPtr,
  ReactExpectedProps
} from './_types';

export function adHocLoadingStateManager<T extends {}>(
  database: CachedData,
  placeholdersFnPtr: PlaceholdersFnPtr,
  fc: FunctionComponent<T>,
  props: ExpectedProps<T>
): ReactElement | null {
  const doCreateAdHocPlaceholder = (): ReactElement => createElement(fc, adHocProps as ReactExpectedProps<T>);

  const DEFAULT_LOADING_STATE: TLoadingState = 'LOADING';
  let adHocProps = props;
  if (!database) {
    adHocProps = { ...adHocProps, loadingState: DEFAULT_LOADING_STATE };
    return doCreateAdHocPlaceholder();
  }

  const { loadingState } = database as FetchResponseSchema;
  if (loadingState === 'FAILED_TO_LOAD') {
    return placeholdersFnPtr(loadingState);
  }

  const cachedData = cachedDatabase();
  if (loadingState !== 'LOADED') {
    adHocProps = { ...adHocProps, loadingState, cachedData };
    return doCreateAdHocPlaceholder();
  }
  return null;
}

export default adHocLoadingStateManager;
