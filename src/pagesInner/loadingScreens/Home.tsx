import type { FunctionComponent } from 'react';
import type DbEntityMetadatas from '../../config/MetadatasSchema';
import adHocLoadingScreen from './adHocUtils/adHocLoadingScreen';

import HomepageBanner from '../../components/HomepageBanner';
import { componentBody as homepageComponentBody, firstLoadPlaceholders as homepageFirstLoadPlaceholders } from '../Home';
import type { LoadingScreenPropsBase } from './_types';
import { RETRYING_TO_LOAD_CLS } from './_types';

interface HomepageLoadingScreenProps extends LoadingScreenPropsBase {}

export const HomepageLoadingScreen: FunctionComponent<HomepageLoadingScreenProps> = ({ loadingState, cachedData }) => {
  const maybeForcedPlaceholder = adHocLoadingScreen(cachedData, loadingState, homepageFirstLoadPlaceholders);

  return maybeForcedPlaceholder ? (
    maybeForcedPlaceholder
  ) : (
    <>
      <HomepageBanner />
      <div className={RETRYING_TO_LOAD_CLS}>{homepageComponentBody(cachedData!.responseData as DbEntityMetadatas[])}</div>;
    </>
  );
};

export default HomepageLoadingScreen;
