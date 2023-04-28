import { FunctionComponent } from 'react';
import DbEntityMetadatas from '../../config/MetadatasSchema';

import { componentBody as homepageComponentBody, firstLoadPlaceholders as homepageFirstLoadPlaceholders } from '../Home';
import { LoadingScreenPropsBase } from './_types';

interface HomepageLoadingScreenProps extends LoadingScreenPropsBase {}

export const HomepageLoadingScreen: FunctionComponent<HomepageLoadingScreenProps> = ({ loadingState, cachedData }) => {
  if (!cachedData) {
    return homepageFirstLoadPlaceholders(loadingState);
  } else {
    return <div style={{ opacity: 0.5 }}>{homepageComponentBody(cachedData.responseData as DbEntityMetadatas[])}</div>;
  }
};

export default HomepageLoadingScreen;
