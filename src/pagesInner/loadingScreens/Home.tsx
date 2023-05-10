import { FunctionComponent } from 'react';
import DbEntityMetadatas from '../../config/MetadatasSchema';
import adHocLoadingScreen from './adHocUtils/adHocLoadingScreen';

import HomepageBanner from '../../components/HomepageBanner';
import { componentBody as homepageComponentBody, firstLoadPlaceholders as homepageFirstLoadPlaceholders } from '../Home';
import { LoadingScreenPropsBase, RETRYING_TO_LOAD_CLS } from './_types';

interface HomepageLoadingScreenProps extends LoadingScreenPropsBase {}

export const HomepageLoadingScreen: FunctionComponent<HomepageLoadingScreenProps> = ({ loadingState, cachedData }) => {
  const maybeForcedPlaceholder = adHocLoadingScreen(cachedData, loadingState, homepageFirstLoadPlaceholders);

  if (maybeForcedPlaceholder) {
    return maybeForcedPlaceholder;
  } else {
    return (
      <>
        <HomepageBanner />
        <div className={RETRYING_TO_LOAD_CLS}>{homepageComponentBody(cachedData!.responseData as DbEntityMetadatas[])}</div>;
      </>
    );
  }
};

export default HomepageLoadingScreen;
