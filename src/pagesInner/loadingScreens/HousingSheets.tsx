import { FunctionComponent } from 'react';
import DbEntityMetadatas from '../../config/MetadatasSchema';
import adHocLoadingScreen from './adHocLoadingScreen';

import { componentBody as housingSheetsComponentBody, firstLoadPlaceholders as housingSheetsFirstLoadPlaceholders } from '../HousingSheets';
import { LoadingScreenPropsBase } from './_types';

interface HousingSheetLoadingScreenProps extends LoadingScreenPropsBase {
  sheetId: string;
}

export const HousingSheetLoadingScreen: FunctionComponent<HousingSheetLoadingScreenProps> = ({ loadingState, cachedData, sheetId }) => {
  const maybeForcedPlaceholder = adHocLoadingScreen(cachedData, loadingState, housingSheetsFirstLoadPlaceholders);

  if (maybeForcedPlaceholder) {
    return maybeForcedPlaceholder;
  } else {
    return <div style={{ opacity: 0.5 }}>{housingSheetsComponentBody(cachedData!.responseData as DbEntityMetadatas[], sheetId)}</div>;
  }
};

export default HousingSheetLoadingScreen;
