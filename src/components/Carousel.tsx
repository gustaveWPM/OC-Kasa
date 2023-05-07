import { FunctionComponent, memo } from 'react';

import './styles/carousel.scss';

interface CarouselProps {
  srcs: string[];
}

const Carousel: FunctionComponent<CarouselProps> = ({ srcs }) => {
  return (
    <div className="kasa-carousel">
      <div className="kasa-carousel-img-element" style={{ backgroundImage: `url(${srcs[0]})` }} />
    </div>
  );
};

export default memo(Carousel);
