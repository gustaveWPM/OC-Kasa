import { useEffect, useState } from 'react';

import DbEntityMetadatas, { DbEntitiesMetadatasFields } from '../../config/metadatasSchema';
import { DbContext } from '../../contexts/DatabaseContext';
import { getDbPartialElements } from '../../services/dbService';

export function useFilteredDbEntities(ctx: DbContext, ids: string[], fields: DbEntitiesMetadatasFields) {
  const initialData: Partial<DbEntityMetadatas>[] = [];
  const [dbEntities, setDbEntities] = useState(initialData);

  useEffect(() => {
    function getDbEntities() {
      if (ctx.loadingState === 'LOADED') {
        const dbEntities = getDbPartialElements(ctx, ids, fields);
        setDbEntities(dbEntities);
      }
    }
    getDbEntities();
  }, [ctx.loadingState]);

  return dbEntities;
}

export default useFilteredDbEntities;
