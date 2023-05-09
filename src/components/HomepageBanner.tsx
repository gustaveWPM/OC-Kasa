import { FunctionComponent } from 'react';
import { VocabAccessor } from '../config/vocab/VocabAccessor';

import './styles/homepageBanner.scss';

interface HomepageBannerProps {}

const HomepageBanner: FunctionComponent<HomepageBannerProps> = () => {
  return (
    <>
      <header className="homepage banner-wrapper">
        <div className="banner-content">
          <h1 className="banner-title">
            {VocabAccessor('KASA_CATCHPHRASE_FIRST_LINE')}&nbsp;
            <span className="banner-title-linebreak">{VocabAccessor('KASA_CATCHPHRASE_SECOND_LINE')}</span>
          </h1>
          <div className="banner-background-wrapper">
            <div className="banner-background"></div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomepageBanner;
