import { ChangeEvent,  useState } from 'react';
import ReviewRatingStars from './review-rating-stars/review-rating-stars';

function ReviewForm(): JSX.Element {

  const [userReview, setUserReview] = useState({ rating: '0', review: '' });

  const onUserReviewChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserReview((prevUserReview) => ({
      ...prevUserReview,
      [evt.target.name]: evt.target.value,
    }));
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <ReviewRatingStars rating={userReview.rating} onRatingChange={onUserReviewChange} />
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={userReview.review}
        onChange={(evt) => onUserReviewChange(evt)}
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
