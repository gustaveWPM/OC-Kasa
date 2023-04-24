export interface DbEntityMetadatas {
  id: string;
  title: string;
  cover: string;
  pictures: string[];
  description: string;
  host: {
    name: string;
    picture: string;
  };
  rating: string;
  location: string;
  equipments: string[];
  tags: string[];
}

export type DbEntityMetadatasField = keyof DbEntityMetadatas;
export type DbEntitiesMetadatasFields = DbEntityMetadatasField[];

export default DbEntityMetadatas;
