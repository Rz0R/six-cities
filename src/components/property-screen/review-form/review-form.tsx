import { ChangeEvent, useState } from 'react';
import ReviewRaitingStars from './review-rating-stars/review-rating-stars';

function ReviewForm(): JSX.Element {

  const [review, setReview] = useState({ rating: 0, message: '' });

  const onRatingChange = (rating: number) => {
    setReview((prevReview) => ({
      ...prevReview,
      rating,
    }));
  };

  const onMessageChange = (message: string) => {
    setReview((prevReview) => ({
      ...prevReview,
      message,
    }));
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <ReviewRaitingStars rating={review.rating} onRatingChange={onRatingChange} />
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={review.message}
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => onMessageChange(evt.target.value)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay with
          at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
