import { FunctionComponent, memo } from 'react';
import { VocabAccessor } from '../config/vocab/VocabAccessor';

import './styles/homepageHeader.scss';

interface HomepageHeaderProps {}

const HomepageHeader: FunctionComponent<HomepageHeaderProps> = () => {
  return (
    <>
      <header className="header-wrapper">
        <div className="header-content">
          <h1 className="header-title">
            {VocabAccessor('KASA_CATCHPHRASE_FIRST_LINE')}&nbsp;
            <span className="header-title-linebreak">{VocabAccessor('KASA_CATCHPHRASE_SECOND_LINE')}</span>
          </h1>
          <div className="header-background-wrapper">
            <div className="header-background"></div>
          </div>
        </div>
      </header>
    </>
  );
};

export default memo(HomepageHeader);
