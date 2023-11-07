import type { FunctionComponent } from 'react';
import type DbEntityMetadatas from '../../config/MetadatasSchema';
import adHocLoadingScreen from './adHocUtils/adHocLoadingScreen';

import { componentBody as housingSheetsComponentBody, firstLoadPlaceholders as housingSheetsFirstLoadPlaceholders } from '../HousingSheets';
import type { LoadingScreenPropsBase } from './_types';
import { RETRYING_TO_LOAD_CLS } from './_types';

interface HousingSheetLoadingScreenProps extends LoadingScreenPropsBase {
  sheetId: string;
}

export const HousingSheetLoadingScreen: FunctionComponent<HousingSheetLoadingScreenProps> = ({ loadingState, cachedData, sheetId }) => {
  const maybeForcedPlaceholder = adHocLoadingScreen(cachedData, loadingState, housingSheetsFirstLoadPlaceholders);

  if (maybeForcedPlaceholder) return maybeForcedPlaceholder;

  return <div className={RETRYING_TO_LOAD_CLS}>{housingSheetsComponentBody(cachedData!.responseData as DbEntityMetadatas[], sheetId)}</div>;
};

export default HousingSheetLoadingScreen;
