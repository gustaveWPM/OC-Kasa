import { FunctionComponent } from 'react';
import DbEntityMetadatas from '../config/metadatasSchema';

interface HousingSheetProps extends Omit<DbEntityMetadatas, 'id'> {}

const HousingSheet: FunctionComponent<HousingSheetProps> = ({ title, cover, pictures, description, host, rating, location, equipments, tags }) => {
  return (
    <>
      <p>{title}</p>
      <p>{cover}</p>
      <p>{pictures}</p>
      <p>{description}</p>
      <p>
        {host.name}
        <br />
        {host.picture}
      </p>
      <p>{rating}</p>
      <p>{location}</p>
      <p>{equipments}</p>
      <p>{tags}</p>
    </>
  );
};

export default HousingSheet;
