import { FunctionComponent } from 'react';
import DbEntityMetadatas from '../../config/MetadatasSchema';
import adHocLoadingScreen from './adHocUtils/adHocLoadingScreen';

import { componentBody as housingSheetsComponentBody, firstLoadPlaceholders as housingSheetsFirstLoadPlaceholders } from '../HousingSheets';
import { LoadingScreenPropsBase, retryingToLoadCls } from './_types';

interface HousingSheetLoadingScreenProps extends LoadingScreenPropsBase {
  sheetId: string;
}

export const HousingSheetLoadingScreen: FunctionComponent<HousingSheetLoadingScreenProps> = ({ loadingState, cachedData, sheetId }) => {
  const maybeForcedPlaceholder = adHocLoadingScreen(cachedData, loadingState, housingSheetsFirstLoadPlaceholders);

  if (maybeForcedPlaceholder) {
    return maybeForcedPlaceholder;
  } else {
    return <div className={retryingToLoadCls}>{housingSheetsComponentBody(cachedData!.responseData as DbEntityMetadatas[], sheetId)}</div>;
  }
};

export default HousingSheetLoadingScreen;
