import { FunctionComponent } from 'react';
import DbEntityMetadatas from '../../config/MetadatasSchema';
import adHocLoadingScreen from './adHocUtils/adHocLoadingScreen';

import { componentBody as housingSheetsComponentBody, firstLoadPlaceholders as housingSheetsFirstLoadPlaceholders } from '../HousingSheets';
import { LoadingScreenPropsBase, RETRYING_TO_LOAD_CLS } from './_types';

interface HousingSheetLoadingScreenProps extends LoadingScreenPropsBase {
  sheetId: string;
}

export const HousingSheetLoadingScreen: FunctionComponent<HousingSheetLoadingScreenProps> = ({ loadingState, cachedData, sheetId }) => {
  const maybeForcedPlaceholder = adHocLoadingScreen(cachedData, loadingState, housingSheetsFirstLoadPlaceholders);

  if (maybeForcedPlaceholder) {
    return maybeForcedPlaceholder;
  } else {
    return <div className={RETRYING_TO_LOAD_CLS}>{housingSheetsComponentBody(cachedData!.responseData as DbEntityMetadatas[], sheetId)}</div>;
  }
};

export default HousingSheetLoadingScreen;
