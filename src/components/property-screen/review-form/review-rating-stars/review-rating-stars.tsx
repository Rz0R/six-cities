import { Fragment, ChangeEvent } from 'react';
import { RatingNames } from '../../../../const';
import { raitingValues } from '../../../../utils/common';

type ReviewRaitingStarsProps = {
  rating: number
  onRatingChange: (value: number) => void
}

function ReviewRaitingStars({ rating, onRatingChange }: ReviewRaitingStarsProps): JSX.Element {

  return (
    <Fragment>
      {
        raitingValues.map((rank) => (
          <>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={rank}
              id={`${rank}-stars`}
              type="radio"
              checked={rank === rating}
              onChange={(evt: ChangeEvent<HTMLInputElement>) => onRatingChange(Number(evt.target.value))}
            />
            <label
              htmlFor={`${rank}-stars`}
              className="reviews__rating-label form__rating-label"
              title={RatingNames[rank - 1]}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </>
        ))
      }
    </Fragment>
  );
}

export default ReviewRaitingStars;
