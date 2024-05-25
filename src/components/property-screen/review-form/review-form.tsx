import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postCommentAction } from '../../../store/api-actions';
import { setPostCommentStatus } from '../../../store/actions';
import ReviewRatingStars from './review-rating-stars/review-rating-stars';
import { PostCommentStatus, ReviewFormSettings } from '../../../const';
import { getPostCommentStatus } from '../../../store/comments-data/selectors';

const initialUserReviewState = { rating: 0, review: '' };

function ReviewForm(): JSX.Element {
  const { id = '' } = useParams();
  const dispatch = useDispatch();

  const postCommentStatus = useSelector(getPostCommentStatus);

  const [userReview, setUserReview] = useState(initialUserReviewState);
  const { rating, review } = userReview;

  const isSubmitButtonActive =
    userReview.review.length >= ReviewFormSettings.MIN_LENGTH &&
    userReview.review.length <= ReviewFormSettings.MAX_LENGTH &&
    Number(userReview.rating) >= ReviewFormSettings.MIN_RATING &&
    Number(userReview.rating) <= ReviewFormSettings.MAX_RATING &&
    postCommentStatus !== PostCommentStatus.Posting;

  const onUserReviewChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserReview((prevUserReview) => ({
      ...prevUserReview,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(postCommentAction(id, { comment: review, rating: Number(rating) }));
  };

  useEffect(() => {
    if (postCommentStatus === PostCommentStatus.Success) {
      setUserReview(initialUserReviewState);
      dispatch(setPostCommentStatus(PostCommentStatus.Idle));
    }
  }, [postCommentStatus, dispatch]);

  return (
    <form className="reviews__form form" onSubmit={onSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <ReviewRatingStars rating={rating} onRatingChange={onUserReviewChange} />
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={onUserReviewChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
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
