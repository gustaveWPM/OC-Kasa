import { FunctionComponent, memo, useState } from 'react';

import './styles/carousel.scss';

type CarouselProps = {
  images: string[];
  transitionDuration?: number;
};

const Carousel: FunctionComponent<CarouselProps> = ({ images, transitionDuration = 500 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transition, setTransition] = useState(false);

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTransition(true);
    setTimeout(() => setTransition(false), transitionDuration);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setTransition(true);
    setTimeout(() => setTransition(false), transitionDuration);
  };

  return (
    <div className="kasa-carousel">
      <div
        className="kasa-carousel-inner"
        style={{ transition: `transform ${transitionDuration}ms`, transform: `translateX(-${currentImageIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            style={{
              flex: '0 0 100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ))}
      </div>
      <button onClick={previousImage} style={{ position: 'absolute', left: 0 }}>
        Prev
      </button>
      <button onClick={nextImage} style={{ position: 'absolute', right: 0 }}>
        Next
      </button>
    </div>
  );
};

export default memo(Carousel);
