import type { FunctionComponent } from 'react';
import Accordion from '../components/Accordion';
import HostButton from '../components/HostButton';
import HousingRating from '../components/HousingRating';
import ImagesSlider from '../components/ImagesSlider';
import TagsLabelsCollection from '../components/TagsLabelsCollection';

interface DummyHousingSheetProps {
  cls: string;
  loadingPlaceholder: string;
}

export const DummyHousingSheet: FunctionComponent<DummyHousingSheetProps> = ({ cls, loadingPlaceholder }) => {
  return (
    <div className="housing-sheets-page-wrapper">
      <div className={`housing-sheets-carousel ${cls}`}>
        <ImagesSlider images={[]} />
      </div>
      <div className={`housing-sheet-introduction ${cls}`}>
        <div className="housing-sheet-titles-and-tags-group">
          <h1 className="housing-sheet-title">{loadingPlaceholder}</h1>
          <h2 className="housing-sheet-location-title">{loadingPlaceholder}</h2>
          <TagsLabelsCollection tags={[]} />
        </div>
        <div className="housing-sheet-host-and-rate-group">
          <HostButton host={{ name: '...' }} />
          <HousingRating rating={'0'} />
        </div>
      </div>
      <div className={`housing-sheet-accordions ${cls}`}>
        <Accordion items={[{ title: loadingPlaceholder, content: <p>{loadingPlaceholder}</p> }]} />

        <Accordion
          items={[
            {
              title: loadingPlaceholder,
              content: <ul className="equipment-items-list-container">{loadingPlaceholder}</ul>
            }
          ]}
        />
      </div>
    </div>
  );
};

export default DummyHousingSheet;
