import type { FunctionComponent, ReactElement } from 'react';
import { createElement } from 'react';
import type { FetchResponseSchema, TLoadingState } from '../../../dev/hooks/useFetch';
import type CachedData from '../../../dev/namespaces/_types';
import cachedDatabase from '../../../dev/namespaces/cache';

import type {
  AdHocLoadingStateManagerExpectedProps as ExpectedProps,
  AdHocLoadingStateManagerPlaceholdersFnPtr as PlaceholdersFnPtr,
  ReactExpectedProps
} from '../_types';

export function adHocLoadingStateManager<T extends object>(
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
  if (loadingState === 'FAILED_TO_LOAD') return placeholdersFnPtr(loadingState);

  const cachedData = cachedDatabase();
  if (loadingState !== 'LOADED') {
    adHocProps = { ...adHocProps, loadingState, cachedData };
    return doCreateAdHocPlaceholder();
  }
  return null;
}

export default adHocLoadingStateManager;
