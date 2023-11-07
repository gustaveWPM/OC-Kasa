import type { CSSProperties, FunctionComponent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { VocabAccessor } from '../config/vocab/VocabAccessor';
import { getRefCurrentPtr } from '../dev/plainJS/getRefCurrentPtr';

import './styles/imagesSlider.scss';

type ImagesSliderProps = {
  images: string[];
  transitionDuration?: number;
};

type ImagesSliderDir = 'left' | 'right' | null;
type OptionalNumber = number | null;
type TwoPointsCoordinates = { startX: OptionalNumber; startY: OptionalNumber; endX: OptionalNumber; endY: OptionalNumber };

type SwipeState = {
  startX: OptionalNumber;
  startY: OptionalNumber;
  currentX: OptionalNumber;
  currentY: OptionalNumber;
  direction: ImagesSliderDir;
  distance: number;
};

const DISABLE_SCROLL_CLS = 'disable-scroll';
const IS_TRANSITIONNING_CLS = 'is-transitionning';
const MIN_SWIPING_DISTANCE_TO_SLIDE = 100;
const MIN_SWIPING_DISTANCE_TO_COMPUTE_HORIZONTAL_ANGLE = 10;

const initialSwipeState: SwipeState = {
  startX: null,
  startY: null,
  currentX: null,
  currentY: null,
  direction: null,
  distance: 0
};

const ImagesSlider: FunctionComponent<ImagesSliderProps> = ({ images, transitionDuration = 500 }) => {
  const swipeStateRef = useRef<SwipeState>(initialSwipeState);
  const swipeAreaRef = useRef<HTMLDivElement>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitionning, setTransitionning] = useState(false);
  const [dir, setDir] = useState<ImagesSliderDir>(null);
  const [carrouselBackgrounds, setCarrouselBackgrounds] = useState(<></>);
  const [isSwiping, setSwiping] = useState(false);

  function getAngle(coordinates: TwoPointsCoordinates) {
    for (const v of Object.values(coordinates)) {
      if (v === null) return null;
    }

    const dx = (coordinates.startX as number) - (coordinates.endX as number);
    const dy = (coordinates.endY as number) - (coordinates.startY as number);
    let angle = Math.atan2(dy, dx);
    angle *= 180 / Math.PI;
    if (angle < 0) angle += 360;
    angle = (90 + angle) % 360;
    return angle;
  }

  function isValidAngle(angle: OptionalNumber, direction: ImagesSliderDir) {
    if (direction === null) return true;
    if (angle === null) return false;

    const isValidLeftAngle = (angle: number) => angle === 0 || (angle >= 235 && angle <= 295);
    const isValidRightAngle = (angle: number) => angle === 0 || (angle >= 65 && angle <= 125);
    if (direction === 'left') return isValidLeftAngle(angle);
    return isValidRightAngle(angle);
  }

  function isVerticalAngle(angle: OptionalNumber) {
    if (angle === null) return false;
    return !isValidAngle(angle, 'left') && !isValidAngle(angle, 'right');
  }

  function resetSwipableAreaOffset() {
    const swipableArea = getRefCurrentPtr(swipeAreaRef);
    if (!swipableArea) return;

    swipableArea.style.transition = `left ${transitionDuration * 0.7}ms`;
    swipableArea.style.left = '0px';
  }

  function doUpdateSwipableAreaOffset(offsetX: number) {
    const swipableArea = getRefCurrentPtr(swipeAreaRef);
    if (!swipableArea) return;

    const maxOffsetX = swipableArea.getBoundingClientRect().width;
    if (Math.abs(offsetX) >= maxOffsetX) offsetX = offsetX < 0 ? -maxOffsetX : maxOffsetX;
    swipableArea.style.transition = '';
    swipableArea.style.left = `${offsetX}px`;
  }

  const setBodyStylingSideEffects = () => document.body.classList.add(DISABLE_SCROLL_CLS);
  const resetBodyStylingSideEffects = () => document.body.classList.remove(DISABLE_SCROLL_CLS);

  function swipeKillswitch() {
    resetSwipableAreaOffset();
    swipeStateRef.current = initialSwipeState;
    resetBodyStylingSideEffects();
  }

  function updateSwipableAreaOffset(offsetX: number) {
    if (offsetX === 0) resetSwipableAreaOffset();
    else doUpdateSwipableAreaOffset(offsetX);
  }

  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches.length !== 1) return;

    const startX = e.touches[0].clientX;
    const startY = e.touches[0].clientY;
    swipeStateRef.current = { ...initialSwipeState, startX, startY, currentX: startX, currentY: startY };
    setSwiping(true);
  }

  function slidesIndicator(maxImageIndex: number) {
    let currentIndex = currentImageIndex + 1;
    if (transitionning) {
      if (dir === 'right') currentIndex += 1;
      else if (dir === 'left') currentIndex -= 1;

      if (currentIndex > maxImageIndex) currentIndex = 1;
      else if (currentIndex <= 0) currentIndex = maxImageIndex;
    }

    return (
      <div className="kasa-images-slider-indicator">
        {currentIndex}/{maxImageIndex}
      </div>
    );
  }

  function processClockedTransition(direction: ImagesSliderDir) {
    if (transitionning) return;

    setTransitionning(true);
    setDir(direction);
    const min_tdelta = 150;
    let t_delta = transitionDuration / 20;
    t_delta = t_delta < min_tdelta ? min_tdelta : t_delta;
    setTimeout(() => {
      if (direction === 'left') setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      else if (direction === 'right') setCurrentImageIndex((prev) => (prev + 1) % images.length);

      setDir(null);
      setTransitionning(false);
    }, transitionDuration + t_delta);
  }

  const previousImage = () => processClockedTransition('left');
  const nextImage = () => processClockedTransition('right');

  useEffect(() => {
    function handleTouchMove(e: TouchEvent) {
      if (swipeStateRef.current.startX === null || transitionning) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const offsetX = Math.round(swipeStateRef.current.startX) - Math.round(currentX);
      let direction: ImagesSliderDir = null;
      direction = offsetX < 0 ? 'left' : 'right';

      const { startX, startY } = getRefCurrentPtr(swipeStateRef);
      const currentSwipeStateRefValue = getRefCurrentPtr(swipeStateRef);
      const Xdistance = currentSwipeStateRefValue.distance;
      const Ydistance = Math.abs((startY as number) - currentY);
      const skipHorizontalAngleValidation =
        Xdistance < MIN_SWIPING_DISTANCE_TO_COMPUTE_HORIZONTAL_ANGLE || Ydistance < MIN_SWIPING_DISTANCE_TO_COMPUTE_HORIZONTAL_ANGLE;
      const angle = getAngle({ startX, startY, endX: currentX, endY: currentY });
      const verticalAngle = isVerticalAngle(angle);
      const validAngle = isValidAngle(angle, direction);
      if (verticalAngle || (!skipHorizontalAngleValidation && !validAngle)) {
        swipeKillswitch();
        return;
      }
      if (e.cancelable) e.preventDefault();

      const distance = Math.abs(offsetX);
      swipeStateRef.current = { ...currentSwipeStateRefValue, currentX, currentY, direction, distance };
      updateSwipableAreaOffset(-offsetX);
    }

    function handleTouchEnd() {
      if (swipeStateRef.current.startX !== null && !transitionning) {
        updateSwipableAreaOffset(0);
        if (swipeStateRef.current.direction !== null && swipeStateRef.current.distance > MIN_SWIPING_DISTANCE_TO_SLIDE) {
          processClockedTransition(swipeStateRef.current.direction);
        }
      }
      setSwiping(false);
    }

    if (isSwiping) {
      setBodyStylingSideEffects();
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      resetBodyStylingSideEffects();
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isSwiping]);

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
        />
        <div
          className="kasa-images-slider-background-img-div"
          style={{
            left: '0',
            backgroundImage: `url(${images[index]})`,
            transform: 'translateX(-100%)',
            ...currentImgAdditionnalStyle
          }}
        />
        <div
          className="kasa-images-slider-background-img-div"
          style={{
            left: '-100%',
            backgroundImage: `url(${images[nextIndex]})`,
            ...nextImgAdditionnalStyle
          }}
        />
      </div>
    );
  }, [transitionning]);

  if (images.length > 1) {
    const transitionningCls = transitionning ? IS_TRANSITIONNING_CLS : '';
    return (
      <div className="kasa-images-slider" onTouchStart={handleTouchStart}>
        <>{slidesIndicator(images.length)}</>
        <div className="kasa-images-slider-inner">
          <>{carrouselBackgrounds}</>
        </div>
        <>
          <button aria-label={VocabAccessor('IMAGE_SLIDER_PREV_IMAGE_ARIA_LABEL')} className="button button-prev" onClick={previousImage}>
            <div className={`button-icon button-prev-icon ${transitionningCls}`} />
          </button>
          <button aria-label={VocabAccessor('IMAGE_SLIDER_NEXT_IMAGE_ARIA_LABEL')} className="button button-next" onClick={nextImage}>
            <div className={`button-icon button-next-icon ${transitionningCls}`} />
          </button>
        </>
      </div>
    );
  }

  return (
    <div className="kasa-images-slider">
      <div className="kasa-images-slider-inner">
        <>{carrouselBackgrounds}</>
      </div>
    </div>
  );
};

export default ImagesSlider;
