import { ChangeEvent, FormEvent } from 'react';
import ReviewRatingStars from './review-rating-stars/review-rating-stars';

type ReviewFormProps = {
  comment: {
    rating: string,
    review: string,
  },
  isSubmitButtonActive: boolean,
  onCommentChange: (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  onSubmit: (evt: FormEvent) => void,
};

function ReviewForm({ comment: { rating, review }, onCommentChange, onSubmit, isSubmitButtonActive }: ReviewFormProps): JSX.Element {

  return (
    <form
      className="reviews__form form"
      onSubmit={onSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <ReviewRatingStars rating={rating} onRatingChange={onCommentChange} />
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={review}
        onChange={onCommentChange}
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
          disabled={!isSubmitButtonActive}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
