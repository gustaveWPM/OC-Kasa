import DbEntityMetadatas, { DbEntitiesMetadatasFieldsWithoutId } from '../config/MetadatasSchema';

function fetchCurrentPartialElement(element: Partial<DbEntityMetadatas>, fields: DbEntitiesMetadatasFieldsWithoutId) {
  const partialElement: Partial<DbEntityMetadatas> = { id: element.id };
  for (const field of fields) {
    partialElement[field] = element[field] as any;
  }
  return partialElement;
}

export function getDbPartialElements(
  dbRepresentation: DbEntityMetadatas[],
  ids: string[],
  fields: DbEntitiesMetadatasFieldsWithoutId
): Partial<DbEntityMetadatas>[] {
  const elements: Partial<DbEntityMetadatas>[] = [];

  dbRepresentation.forEach((element) => {
    if (ids.includes(element.id)) {
      const currentPartialElement = fetchCurrentPartialElement(element, fields);
      elements.push(currentPartialElement);
    }
  });
  return elements;
}

export function getDbEntityById(dbRepresentation: DbEntityMetadatas[], targetId: string): DbEntityMetadatas | null {
  const result = dbRepresentation.filter(({ id }) => id === targetId);
  if (result.length === 0) {
    return null;
  }
  return result[0];
}

export function getDbCtxEntitiesIds(dbRepresentation: DbEntityMetadatas[]) {
  const ids = Object.values(dbRepresentation).map((obj) => obj.id);
  return ids;
}
