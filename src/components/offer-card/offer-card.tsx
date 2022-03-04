import { Offer, Id } from '../../types/offer';
import { Container } from '../../const';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../const';
import { ThunkAppDispatch } from '../../types/actions';
import { State } from '../../types/state';
import { toggleIsFavoriteAction } from '../../store/api-actions';
import { AuthorizationStatus } from '../../const';

import classNames from 'classnames';
import { connect, ConnectedProps } from 'react-redux';

import { getRatingStyle } from '../../utils/common';

type OfferCardType = {
  offer: Offer,
  container: Container,
  setAciveCard?: React.Dispatch<React.SetStateAction<Id>>,
};

const mapStateToProps = ({ USER }: State) => ({
  isAuthorized: USER.authorizationStatus === AuthorizationStatus.Auth,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  toggleFavorite(id: string, isFavorite: boolean) {
    let status = 1;
    if (isFavorite) {
      status = 0;
    }
    dispatch(toggleIsFavoriteAction(id, status));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & OfferCardType;

function OfferCard({ offer, container, setAciveCard, isAuthorized, toggleFavorite }: ConnectedComponentProps): JSX.Element {

  const navigate = useNavigate();

  const { id, title, previewImage, price, type, isFavorite, isPremium, rating } = offer;
  const raitingStyle = getRatingStyle(rating);


  const onFavoriteClick = () => {
    if (isAuthorized) {
      toggleFavorite(id, isFavorite);
    } else {
      navigate(RoutePaths.SignIn);
    }
  };

  return (
    <article
      className={classNames(
        'place-card',
        { 'cities__place-card': container === Container.Main },
        { 'favorites__card': container === Container.Favorites },
        { 'near-places__card': container === Container.Properties },
      )}
      onMouseOver={() => setAciveCard && setAciveCard(offer.id)}
      onMouseLeave={() => setAciveCard && setAciveCard(null)}
    >
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div
        className={classNames('place-card__image-wrapper',
          { 'cities__image-wrapper': container === Container.Main },
          { 'favorites__image-wrapper': container === Container.Favorites },
          { 'near-places__image-wrapper': container === Container.Properties },
        )}
      >
        <Link to={`${RoutePaths.Room}/${offer.id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={container === Container.Favorites ? 150 : 260}
            height={container === Container.Favorites ? 100 : 200}
            alt={title}
          />
        </Link>
      </div>
      <div
        className={classNames('place-card__info', { 'favorites__card-info': container === Container.Favorites })}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={classNames('place-card__bookmark-button', 'button', { 'place-card__bookmark-button--active': isFavorite })}
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
            <span style={raitingStyle} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${RoutePaths.Room}/${offer.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
export { OfferCard };
export default connector(OfferCard);
