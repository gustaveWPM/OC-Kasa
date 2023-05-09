import { FunctionComponent, ReactElement } from 'react';

const BEST_RATE: number = 5;

interface HousingRatingProps {
  rating: string;
}

const HousingRating: FunctionComponent<HousingRatingProps> = ({ rating }) => {
  const ratingAsNumber = parseInt(rating);
  const fragments: ReactElement[] = [];

  for (let i = 0; i < ratingAsNumber; i++) {
    fragments.push(<img src="/img/icons/rating-full.svg" alt="" key={`housing-sheet-rating-star-nb-${i}`} />);
  }

  for (let i = ratingAsNumber + 1; i <= BEST_RATE; i++) {
    fragments.push(<img src="/img/icons/rating-empty.svg" alt="" key={`housing-sheet-rating-star-nb-${i}`} />);
  }

  return (
    <div role="button" className="housing-sheet-rating" aria-label={`Note: ${rating}/${BEST_RATE}`}>
      {fragments}
    </div>
  );
};

export default HousingRating;
