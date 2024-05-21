import { Fragment, ChangeEvent } from 'react';
import { RatingNames } from '../../../../const';
import { ratingValues } from '../../../../utils/common';

type ReviewRatingStarsProps = {
  rating: string;
  onRatingChange: (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

function ReviewRatingStars({
  rating,
  onRatingChange,
}: ReviewRatingStarsProps): JSX.Element {
  return (
    <Fragment>
      {ratingValues.map((rank) => (
        <Fragment key={rank}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            defaultValue={rank}
            id={`${rank}-stars`}
            type="radio"
            checked={rank === Number(rating)}
            onChange={(evt: ChangeEvent<HTMLInputElement>) =>
              onRatingChange(evt)
            }
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
        </Fragment>
      ))}
    </Fragment>
  );
}

export default ReviewRatingStars;
