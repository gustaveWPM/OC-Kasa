import React, { CSSProperties, FunctionComponent, useEffect, useRef, useState } from 'react';
import { VocabAccessor } from '../config/vocab/VocabAccessor';
import { getRefCurrentPtr } from '../dev/plainJS/getRefCurrentPtr';

import './styles/imagesSlider.scss';

type ImagesSliderProps = {
  images: string[];
  transitionDuration?: number;
};

type SwipeState = {
  startX: number | null;
  startY: number | null;
  currentX: number | null;
  currentY: number | null;
  distance: number;
  isSwiping: boolean;
  direction: ImagesSliderDir;
};

type ImagesSliderDir = 'left' | 'right' | null;
type OptionalNumber = number | null;

const DISABLE_SCROLL_CLS = 'disable-scroll';
const MIN_SWIPING_DISTANCE_TO_SLIDE = 75;
const initialSwipeState: SwipeState = {
  startX: null,
  startY: null,
  currentX: null,
  currentY: null,
  distance: 0,
  isSwiping: false,
  direction: null
};

const ImagesSlider: FunctionComponent<ImagesSliderProps> = ({ images, transitionDuration = 500 }) => {
  const [swipeState, setSwipeState] = useState<SwipeState>(initialSwipeState);
  const swipeAreaRef = useRef<HTMLDivElement>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitionning, setTransitionning] = useState(false);
  const [dir, setDir] = useState<ImagesSliderDir>(null);
  const [carrouselBackgrounds, setCarrouselBackgrounds] = useState(<></>);

  function getAngle(startX: OptionalNumber, startY: OptionalNumber, endX: OptionalNumber, endY: OptionalNumber) {
    if (startX === null || startY === null || endX === null || endY === null) {
      return null;
    }

    const dx = startX - endX;
    const dy = endY - startY;
    let angle = Math.atan2(dy, dx);
    angle *= 180 / Math.PI;
    if (angle < 0) {
      angle = 360 + angle;
    }
    return angle;
  }

  function isValidAngle(angle: OptionalNumber, direction: ImagesSliderDir) {
    function isValidLeftAngle(angle: number) {
      return angle === 0 || (angle >= 135 && angle <= 222);
    }

    function isValidRightAngle(angle: number) {
      return angle === 0 || (angle >= 0 && angle <= 50) || (angle >= 320 && angle <= 360);
    }

    if (direction === null) {
      return true;
    }

    if (angle === null) {
      return false;
    }

    if (direction === 'left') {
      return isValidLeftAngle(angle);
    }
    return isValidRightAngle(angle);
  }

  function resetSwipableAreaOffset() {
    const swipableArea = getRefCurrentPtr(swipeAreaRef);
    if (!swipableArea) {
      return;
    }
    swipableArea.style.transition = `left ${transitionDuration * 0.7}ms ease-in-out`;
    swipableArea.style.left = '0px';
  }

  function doUpdateSwipableAreaOffset(offsetX: number) {
    const swipableArea = getRefCurrentPtr(swipeAreaRef);
    if (!swipableArea) {
      return;
    }
    swipableArea.style.transition = '';
    swipableArea.style.left = `${offsetX}px`;
  }

  function swipeKillswitch() {
    resetSwipableAreaOffset();
    setSwipeState(initialSwipeState);
    document.body.classList.remove(DISABLE_SCROLL_CLS);
  }

  function updateSwipableAreaOffset(offsetX: number) {
    if (offsetX === 0) {
      resetSwipableAreaOffset();
    } else {
      doUpdateSwipableAreaOffset(offsetX);
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) {
      return;
    }
    const startX = e.touches[0].clientX;
    const startY = e.touches[0].clientY;
    setSwipeState((prevSwipeState) => ({ ...prevSwipeState, startX, startY, currentX: startX, currentY: startY, isSwiping: true }));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (swipeState.startX === null || transitionning) {
      return;
    }
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const offsetX = Math.round(swipeState.startX) - Math.round(currentX);
    let direction: ImagesSliderDir = null;
    if (offsetX < 0) {
      direction = 'left';
    } else {
      direction = 'right';
    }

    const angle = getAngle(swipeState.startX, swipeState.startY, swipeState.currentX, swipeState.currentY);
    if (!isValidAngle(angle, direction)) {
      swipeKillswitch();
      return;
    }
    document.body.classList.add(DISABLE_SCROLL_CLS);
    const distance = Math.abs(offsetX);
    setSwipeState((prevSwipeState) => ({ ...prevSwipeState, currentX, currentY, distance, direction }));
    updateSwipableAreaOffset(-offsetX);
  };

  const handleTouchEnd = () => {
    if (swipeState.startX === null || transitionning) {
      return;
    }
    setSwipeState((prevSwipeState) => ({ ...prevSwipeState, isSwiping: false }));
    if (swipeState.startX === null) {
      return;
    }
    updateSwipableAreaOffset(0);
    if (swipeState.direction !== null && swipeState.distance > MIN_SWIPING_DISTANCE_TO_SLIDE) {
      processClockedTransition(swipeState.direction);
    }
    document.body.classList.remove(DISABLE_SCROLL_CLS);
  };

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

  const processClockedTransition = (direction: ImagesSliderDir) => {
    if (transitionning) {
      return;
    }
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
    processClockedTransition('left');
  };

  const nextImage = () => {
    processClockedTransition('right');
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
      <div className="kasa-images-slider-container" ref={swipeAreaRef}>
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
      </div>
    );
  }, [transitionning]);

  return (
    <div className="kasa-images-slider" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
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

export default ImagesSlider;
