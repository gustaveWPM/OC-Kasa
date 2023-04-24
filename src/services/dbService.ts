import DbEntityMetadatas, { DbEntitiesMetadatasFields } from '../config/metadatasSchema';
import { DbContext } from '../contexts/DatabaseContext';

function fetchCurrentPartialElement(element: Partial<DbEntityMetadatas>, fields: DbEntitiesMetadatasFields) {
  const partialElement: Partial<DbEntityMetadatas> = { id: element.id };
  for (const field of fields) {
    partialElement[field] = element[field] as any;
  }
  return partialElement;
}

export function getDbPartialElements(ctx: DbContext, ids: string[], fields: DbEntitiesMetadatasFields): Partial<DbEntityMetadatas>[] {
  const dbRepresentation = ctx.dbRepresentation;
  const elements: Partial<DbEntityMetadatas>[] = [];

  dbRepresentation.forEach((element) => {
    if (ids.includes(element.id as string)) {
      const currentPartialElement = fetchCurrentPartialElement(element, fields);
      elements.push(currentPartialElement);
    }
  });
  return elements;
}

export function getDbEntityById(ctx: DbContext, targetId: string): DbEntityMetadatas | null {
  const result = ctx.dbRepresentation.filter(({ id }) => id === targetId);
  if (result.length === 0) {
    return null;
  }
  return result[0];
}

export function getDbCtxEntitiesIds(ctx: DbContext) {
  const ids = Object.values(ctx.dbRepresentation).map((obj) => obj.id);
  return ids;
}
