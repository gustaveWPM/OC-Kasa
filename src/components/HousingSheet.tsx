import { FunctionComponent, ReactElement } from 'react';
import DbEntityMetadatas from '../config/MetadatasSchema';
import { VocabAccessor } from '../config/vocab/VocabAccessor';
import { setPageTitle, weakPageTitleBuilder } from '../pagesInner/_PageEffects';
import Accordion from './Accordion';

interface HousingSheetProps extends Omit<DbEntityMetadatas, 'id'> {}

function listGenerator(elms: string[], prefix: string) {
  return elms.map((elm): ReactElement => {
    return <li key={`${prefix}-${elm}}`}>{elm}</li>;
  });
}

const HousingSheet: FunctionComponent<HousingSheetProps> = ({ title, cover, pictures, description, host, rating, location, equipments, tags }) => {
  setPageTitle(weakPageTitleBuilder(title));
  return (
    <>
      <img src={pictures[0]} />
      <h1>{title}</h1>
      <h2 className="housing-sheet-location">{location}</h2>
      <>{listGenerator(tags, 'tags-item')}</>
      <div>
        <p>{host.name}</p>
        <img src={host.picture} />
      </div>
      <p>Note: {rating}</p>
      <Accordion items={[{ title: VocabAccessor('HOUSING_SHEET_DESCRIPTION_LABEL'), content: <p>{description}</p> }]} defaultOpenedItemIndex={0} />
      <Accordion
        items={[{ title: VocabAccessor('HOUSING_SHEET_EQUIPMENTS_LABEL'), content: <>{listGenerator(equipments, 'equipments-item')}</> }]}
        defaultOpenedItemIndex={0}
      />
    </>
  );
};

export default HousingSheet;
