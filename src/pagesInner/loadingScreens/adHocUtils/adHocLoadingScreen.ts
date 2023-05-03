import { ReactElement } from 'react';
import { TLoadingState } from '../../../dev/hooks/useFetch';
import CachedData from '../../../dev/namespaces/_types';

export function adHocLoadingScreen(
  cachedData: CachedData,
  loadingState: TLoadingState,
  placeholderFnPtr: (v: TLoadingState) => ReactElement
): ReactElement | null {
  if (!cachedData) {
    return placeholderFnPtr(loadingState);
  } else if (cachedData.loadingState === 'EXPIRED') {
    return placeholderFnPtr('RETRYING_TO_LOAD');
  } else {
    return null;
  }
}

export default adHocLoadingScreen;
