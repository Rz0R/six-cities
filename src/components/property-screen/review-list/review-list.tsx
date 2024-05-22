import dayjs from 'dayjs';
import { Comments } from '../../../types/comments';
import { getRatingStyle } from '../../../utils/common';

type ReviewListPops = {
  comments: Comments;
};

function ReviewList({ comments }: ReviewListPops): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {comments.map((it) => {
          const { id, user, rating, date, comment } = it;

          return (
            <li key={id} className="reviews__item">
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img
                    className="reviews__avatar user__avatar"
                    src={user.avatarUrl}
                    width={54}
                    height={54}
                    alt="Reviews avatar"
                  />
                </div>
                <span className="reviews__user-name">{user.name}</span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={getRatingStyle(rating)} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">{comment}</p>
                <time className="reviews__time" dateTime={dayjs(date).format('YYYY-MM-DD')}>
                  {dayjs(date).format('MMMM YYYY')}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ReviewList;
