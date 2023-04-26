import { FunctionComponent } from 'react';
import DbEntityMetadatas from '../../config/metadatasSchema';
import { TLoadingState } from '../../dev/hooks/tryUseFetch';
import { CachedData } from '../../dev/namespaces/_types';

import { componentBody as housingSheetsComponentBody, firstLoadPlaceholders as housingSheetsFirstLoadPlaceholders } from '../HousingSheets';

interface HousingSheetLoadingScreenProps {
  loadingState: TLoadingState;
  cachedData: CachedData;
  sheetId: string;
}

export const HousingSheetLoadingScreen: FunctionComponent<HousingSheetLoadingScreenProps> = ({ loadingState, cachedData, sheetId }) => {
  if (cachedData === undefined) {
    return housingSheetsFirstLoadPlaceholders(loadingState);
  } else {
    return <div style={{ opacity: 0.5 }}>{housingSheetsComponentBody(cachedData.responseData as DbEntityMetadatas[], sheetId, 'CACHE_CTX')}</div>;
  }
};

export default HousingSheetLoadingScreen;
