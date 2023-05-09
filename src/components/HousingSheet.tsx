import { FunctionComponent, ReactElement } from 'react';
import DbEntityMetadatas from '../config/MetadatasSchema';
import { VocabAccessor } from '../config/vocab/VocabAccessor';
import { setPageTitle, weakPageTitleBuilder } from '../pagesInner/_PageEffects';
import Accordion from './Accordion';
import Carousel from './Carousel';
import HostButton from './HostButton';
import HousingRating from './HousingRating';
import TagsLabelsCollection from './TagsLabelsCollection';

import './styles/housingSheet.scss';

interface HousingSheetProps extends Omit<DbEntityMetadatas, 'id' | 'cover'> {}

function equipmentsListGenerator(strings: string[]) {
  return strings.map((s): ReactElement => {
    return (
      <li className="equipments-item" key={`equipments-item-${s}}`}>
        <span className="equipments-item-span">{s}</span>
      </li>
    );
  });
}

const HousingSheet: FunctionComponent<HousingSheetProps> = ({ title, pictures, description, host, rating, location, equipments, tags }) => {
  setPageTitle(weakPageTitleBuilder(title));
  return (
    <>
      <div className="housing-sheets-carousel">
        <Carousel images={pictures} />
      </div>
      <div className="housing-sheet-introduction">
        <div className="housing-sheet-titles-and-tags-group">
          <h1 className="housing-sheet-title">{title}</h1>
          <h2 className="housing-sheet-location-title">{location}</h2>
          <TagsLabelsCollection tags={tags} />
        </div>
        <div className="housing-sheet-host-and-rate-group">
          <HostButton host={host} />
          <HousingRating rating={rating} />
        </div>
      </div>
      <div className="housing-sheet-accordions">
        <Accordion items={[{ title: VocabAccessor('HOUSING_SHEET_DESCRIPTION_LABEL'), content: <p>{description}</p> }]} defaultOpenedItemIndex={0} />

        <Accordion
          items={[
            {
              title: VocabAccessor('HOUSING_SHEET_EQUIPMENTS_LABEL'),
              content: <ul className="equipment-items-list-container">{equipmentsListGenerator(equipments)}</ul>
            }
          ]}
          defaultOpenedItemIndex={0}
        />
      </div>
    </>
  );
};

export default HousingSheet;
