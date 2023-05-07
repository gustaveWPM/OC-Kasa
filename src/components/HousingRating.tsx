import { FunctionComponent, ReactElement, memo } from 'react';

const BEST_RATE: number = 5;

interface HousingRatingProps {
  rating: string;
}

const HousingRating: FunctionComponent<HousingRatingProps> = ({ rating }) => {
  const ratingAsNumber = parseInt(rating);
  const fragments: ReactElement[] = [];

  for (let i = 0; i < ratingAsNumber; i++) {
    fragments.push(<img src="/img/icons/rating-full.svg" alt="" />);
  }

  for (let i = ratingAsNumber + 1; i <= BEST_RATE; i++) {
    fragments.push(<img src="/img/icons/rating-empty.svg" alt="" />);
  }
  return <div className="housing-sheet-rating">{fragments}</div>;
};

export default memo(HousingRating);
