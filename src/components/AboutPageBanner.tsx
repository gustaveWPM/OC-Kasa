import { FunctionComponent, memo } from 'react';

import './styles/aboutPageBanner.scss';

interface AboutPageBannerProps {}

const AboutPageBanner: FunctionComponent<AboutPageBannerProps> = () => {
  return (
    <>
      <header className="about-page banner-wrapper">
        <div className="banner-content">
          <div className="banner-background-wrapper">
            <div className="banner-background"></div>
          </div>
        </div>
      </header>
    </>
  );
};

export default memo(AboutPageBanner);
