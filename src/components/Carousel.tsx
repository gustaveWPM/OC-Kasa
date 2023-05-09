import { CSSProperties, FunctionComponent, memo, useEffect, useState } from 'react';

import './styles/carousel.scss';

type CarouselProps = {
  images: string[];
  transitionDuration?: number;
};

type CarouselDir = 'left' | 'right' | null;

const Carousel: FunctionComponent<CarouselProps> = ({ images, transitionDuration = 500 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitionning, setTransitionning] = useState(false);
  const [dir, setDir] = useState<CarouselDir>(null);
  const [carrouselBackgrounds, setCarrouselBackgrounds] = useState(<></>);

  const transitionClock = (direction: CarouselDir) => {
    setDir(direction);
    setTransitionning(true);
    setTimeout(() => {
      setTransitionning(false);
      if (direction === 'left') {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (direction === 'right') {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
      setDir(null);
    }, transitionDuration);
  };

  const previousImage = () => {
    if (!transitionning) {
      transitionClock('left');
    }
  };

  const nextImage = () => {
    if (!transitionning) {
      transitionClock('right');
    }
  };

  useEffect(() => {
    const index = currentImageIndex;
    const nextIndex = images[index + 1] ? index + 1 : 0;
    const prevIndex = images[index - 1] ? index - 1 : images.length - 1;
    const transitionningLeftStyleBase: CSSProperties = { transition: `transform ${transitionDuration}ms` };
    const transitionningRightStyleBase: CSSProperties = { transition: `left ${transitionDuration}ms` };
    let prevImgAdditionnalStyle: CSSProperties = {};
    let currentImgAdditionnalStyle: CSSProperties = {};
    let nextImgAdditionnalStyle: CSSProperties = {};

    if (dir === 'left') {
      const transitionningAdHocStyle: CSSProperties = { ...transitionningLeftStyleBase, transform: 'translateX(0%)' };
      currentImgAdditionnalStyle = transitionningAdHocStyle;
      prevImgAdditionnalStyle = transitionningAdHocStyle;
    } else if (dir === 'right') {
      currentImgAdditionnalStyle = { ...transitionningRightStyleBase, left: '-99.9%' };
      nextImgAdditionnalStyle = { ...transitionningRightStyleBase, left: '-200%' };
    }

    setCarrouselBackgrounds(
      <>
        <div
          className="kasa-carousel-background-img-div"
          style={{
            left: '0',
            backgroundImage: `url(${images[prevIndex]})`,
            transform: 'translateX(-100%)',
            ...prevImgAdditionnalStyle
          }}
        ></div>
        <div
          className="kasa-carousel-background-img-div"
          style={{
            left: '0',
            backgroundImage: `url(${images[index]})`,
            transform: 'translateX(-100%)',
            ...currentImgAdditionnalStyle
          }}
        ></div>
        <div
          className="kasa-carousel-background-img-div"
          style={{
            left: '-100%',
            backgroundImage: `url(${images[nextIndex]})`,
            ...nextImgAdditionnalStyle
          }}
        ></div>
      </>
    );
  }, [transitionning]);

  return (
    <div className="kasa-carousel">
      <div className="kasa-carousel-inner">
        <>{carrouselBackgrounds}</>
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
