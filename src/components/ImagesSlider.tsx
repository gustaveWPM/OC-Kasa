import { CSSProperties, FunctionComponent, memo, useEffect, useState } from 'react';

import { VocabAccessor } from '../config/vocab/VocabAccessor';
import './styles/imagesSlider.scss';

type ImagesSliderProps = {
  images: string[];
  transitionDuration?: number;
};

type ImagesSliderDir = 'left' | 'right' | null;

const ImagesSlider: FunctionComponent<ImagesSliderProps> = ({ images, transitionDuration = 500 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitionning, setTransitionning] = useState(false);
  const [dir, setDir] = useState<ImagesSliderDir>(null);
  const [carrouselBackgrounds, setCarrouselBackgrounds] = useState(<></>);

  function slidesIndicator(maxImageIndex: number) {
    let currentIndex = currentImageIndex + 1;
    if (transitionning) {
      if (dir === 'right') {
        currentIndex += 1;
      } else if (dir === 'left') {
        currentIndex -= 1;
      }
      if (currentIndex > maxImageIndex) {
        currentIndex = 1;
      } else if (currentIndex <= 0) {
        currentIndex = maxImageIndex;
      }
    }

    return (
      <div className="kasa-images-slider-indicator">
        {currentIndex}/{maxImageIndex}
      </div>
    );
  }

  const transitionClock = (direction: ImagesSliderDir) => {
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
          className="kasa-images-slider-background-img-div"
          style={{
            left: '0',
            backgroundImage: `url(${images[prevIndex]})`,
            transform: 'translateX(-100%)',
            ...prevImgAdditionnalStyle
          }}
        ></div>
        <div
          className="kasa-images-slider-background-img-div"
          style={{
            left: '0',
            backgroundImage: `url(${images[index]})`,
            transform: 'translateX(-100%)',
            ...currentImgAdditionnalStyle
          }}
        ></div>
        <div
          className="kasa-images-slider-background-img-div"
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
    <div className="kasa-images-slider">
      {images.length > 1 && <>{slidesIndicator(images.length)}</>}
      <div className="kasa-images-slider-inner">
        <>{carrouselBackgrounds}</>
      </div>
      {images.length > 1 && (
        <>
          <button aria-label={VocabAccessor('IMAGE_SLIDER_PREV_IMAGE_ARIA_LABEL')} className="button button-prev" onClick={previousImage}>
            <div className="button-icon button-prev-icon"></div>
          </button>
          <button aria-label={VocabAccessor('IMAGE_SLIDER_NEXT_IMAGE_ARIA_LABEL')} className="button button-next" onClick={nextImage}>
            <div className="button-icon button-next-icon"></div>
          </button>
        </>
      )}
    </div>
  );
};

export default memo(ImagesSlider);
