import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Offer, Id } from '../../types/offer';
import { Container, RoutePaths, AuthorizationStatus } from '../../const';
import { toggleIsFavoriteAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-state/selectors';

import { getRatingStyle } from '../../utils/common';

type OfferCardType = {
  offer: Offer;
  container: Container;
  setActiveCard?: React.Dispatch<React.SetStateAction<Id>>;
};

function OfferCard({ offer, container, setActiveCard }: OfferCardType): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id, title, previewImage, price, type, isFavorite, isPremium, rating } = offer;
  const ratingStyle = getRatingStyle(rating);

  const isAuthorized = useSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;

  const toggleFavorite = () => {
    let status = 1;
    if (isFavorite) {
      status = 0;
    }
    dispatch(toggleIsFavoriteAction(id, status));
  };

  const onFavoriteClick = (evt: MouseEvent<HTMLElement>) => {
    evt.stopPropagation();
    if (isAuthorized) {
      toggleFavorite();
    } else {
      navigate(RoutePaths.SignIn);
    }
  };

  const onCardClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    navigate(`${RoutePaths.Room}/${offer.id}`);
  };

  return (
    <article
      className={classNames(
        'place-card',
        { 'cities__place-card': container === Container.Main },
        { favorites__card: container === Container.Favorites },
        { 'near-places__card': container === Container.Properties },
      )}
      onMouseOver={() => setActiveCard && setActiveCard(offer.id)}
      onMouseLeave={() => setActiveCard && setActiveCard(null)}
      onClick={onCardClick}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={classNames(
          'place-card__image-wrapper',
          { 'cities__image-wrapper': container === Container.Main },
          { 'favorites__image-wrapper': container === Container.Favorites },
          { 'near-places__image-wrapper': container === Container.Properties },
        )}
      >
        <div>
          <img
            className="place-card__image"
            src={previewImage}
            width={container === Container.Favorites ? 150 : 260}
            height={container === Container.Favorites ? 100 : 200}
            alt={title}
          />
        </div>
      </div>
      <div
        className={classNames('place-card__info', {
          'favorites__card-info': container === Container.Favorites,
        })}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={classNames('place-card__bookmark-button', 'button', {
              'place-card__bookmark-button--active': isFavorite,
            })}
            type="button"
            onClick={onFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={ratingStyle} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <div>{title}</div>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
