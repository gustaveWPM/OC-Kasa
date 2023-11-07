import type { FunctionComponent } from 'react';

import './styles/aboutPageBanner.scss';

interface AboutPageBannerProps {}

const AboutPageBanner: FunctionComponent<AboutPageBannerProps> = () => {
  return (
    <header className="about-page banner-wrapper">
      <div className="banner-content">
        <div className="banner-background-wrapper">
          <div className="banner-background" />
        </div>
      </div>
    </header>
  );
};

export default AboutPageBanner;
