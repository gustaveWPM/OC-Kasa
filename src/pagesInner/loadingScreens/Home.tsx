import { FunctionComponent } from 'react';
import DbEntityMetadatas from '../../config/metadatasSchema';
import { TLoadingState } from '../../dev/hooks/tryUseFetch';
import { CachedData } from '../../dev/namespaces/_types';

import { componentBody as homepageComponentBody, firstLoadPlaceholders as homepageFirstLoadPlaceholders } from '../Home';

interface HomepageLoadingScreenProps {
  loadingState: TLoadingState;
  cachedData: CachedData;
}

export const HomepageLoadingScreen: FunctionComponent<HomepageLoadingScreenProps> = ({ loadingState, cachedData }) => {
  if (cachedData === undefined) {
    return homepageFirstLoadPlaceholders(loadingState);
  } else {
    return <div style={{ opacity: 0.5 }}>{homepageComponentBody(cachedData.responseData as DbEntityMetadatas[])}</div>;
  }
};

export default HomepageLoadingScreen;
