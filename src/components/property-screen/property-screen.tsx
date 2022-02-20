import { Comments } from '../../types/comments';
import { useParams } from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import ReviewList from './review-list/review-list';
import ReviewForm from './review-form/review-form';
import Map from '../map/map';
import { getRatingStyle, getOfferById } from '../../utils/common';
import OfferCardList from '../offer-card-list/offer-card-list';
import { Container } from '../../const';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import Logo from '../logo/logo';
import Auth from '../auth/auth';

type PropertyScreenProps = {
  comments: Comments,
}

const mapStateToProps = ({ offers }: State) => ({ offers: offers });

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropertyScreenProps & PropsFromRedux;

function PropertyScreen({ offers, comments }: ConnectedComponentProps): JSX.Element {
  const { id: currentId = '' } = useParams();

  const offer = getOfferById(offers, currentId);

  if (!offer) {
    return <NotFoundScreen />;
  }

  const { title, isFavorite, isPremium, images, type, rating, bedrooms, maxAdults, price, goods, host, description } = offer;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <Auth />
          </div>
        </div>
      </header>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                images.slice(0, 6).map((src) => (
                  <div key={`${currentId}-${src}`} className="property__image-wrapper">
                    <img
                      className="property__image"
                      src={src}
                      alt={type}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button
                  className={`property__bookmark-button button ${isFavorite ? 'property__bookmark-button--active' : ''}`}
                  type="button"
                >
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={getRatingStyle(rating)} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {`${type[0].toLocaleUpperCase() + type.slice(1)}`}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    goods.map((it) => <li key={`${currentId}-${it}`} className="property__inside-item">{it}</li>)
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${host.isPro ? 'property__avatar-wrapper--pro' : ''}`}>
                    <img
                      className="property__avatar user__avatar"
                      src={host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{host.name}</span>
                  {host.isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewList comments={comments} />
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="property__map map" >
            <Map offers={offers} currentOffer={offer} activeOfferId={currentId} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {<OfferCardList offers={offers.filter((it) => it.id !== currentId).slice(0, 3)} container={Container.Properties} />}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { PropertyScreen };
export default connector(PropertyScreen);
