import { useParams } from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import ReviewList from './review-list/review-list';
import ReviewForm from './review-form/review-form';
import Map from '../map/map';
import { getRatingStyle } from '../../utils/common';
import OfferCardList from '../offer-card-list/offer-card-list';
import { Container, LoadingStatus } from '../../const';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkAppDispatch } from '../../types/actions';
import { fetchOfferByIdAction, fetchNearbyOffersAction, fetchCommentsAction } from '../../store/api-actions';
import { removeCurrentOfferData, removeNearbyOffersData, removeCommentsData } from '../../store/actions';
import Logo from '../logo/logo';
import Auth from '../auth/auth';
import LoadingScreen from '../loading-screen/loading-screen';
import { useEffect } from 'react';

const mapStateToProps = ({
  currentOfferData: { currentOffer, isCurrentOfferLoaded },
  nearbyOffersData: { nearbyOffers, isNearbyOffersLoaded },
  commentsData: { comments, isCommentsLoaded } }: State) => ({
  currentOffer,
  nearbyOffers,
  comments,
  isDataLoading: (() => (
    isCurrentOfferLoaded === LoadingStatus.Loading
      || isCurrentOfferLoaded === LoadingStatus.Idle
      || isNearbyOffersLoaded === LoadingStatus.Loading
      || isNearbyOffersLoaded === LoadingStatus.Idle
      || isCommentsLoaded === LoadingStatus.Idle
      || isCommentsLoaded === LoadingStatus.Loading
  ))(),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchCurrentOfferById(id: string) {
    dispatch(fetchOfferByIdAction(id));
  },
  deleteCurrentOfferData() {
    dispatch(removeCurrentOfferData());
  },
  fetchNearbyOffers(id: string) {
    dispatch(fetchNearbyOffersAction(id));
  },
  deleteNearbyOffersData() {
    dispatch(removeNearbyOffersData());
  },
  fetchComments(id: string) {
    dispatch(fetchCommentsAction(id));
  },
  deleteCommentsData() {
    dispatch(removeCommentsData());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function PropertyScreen({
  comments,
  currentOffer,
  nearbyOffers,
  isDataLoading,
  fetchCurrentOfferById,
  deleteCurrentOfferData,
  fetchNearbyOffers,
  deleteNearbyOffersData,
  fetchComments,
  deleteCommentsData,
}: PropsFromRedux): JSX.Element {

  const { id: currentId = '' } = useParams();

  useEffect(() => {
    fetchCurrentOfferById(currentId);
    fetchNearbyOffers(currentId);
    fetchComments(currentId);
    return () => {
      deleteCurrentOfferData();
      deleteNearbyOffersData();
      deleteCommentsData();
    };
  }, [
    currentId,
    fetchCurrentOfferById,
    deleteCurrentOfferData,
    fetchNearbyOffers,
    deleteNearbyOffersData,
    fetchComments,
    deleteCommentsData,
  ]);

  if (isDataLoading) {
    return <LoadingScreen />;
  }

  if (!currentOffer) {
    return <NotFoundScreen />;
  }

  const { title, isFavorite, isPremium, images, type, rating, bedrooms, maxAdults, price, goods, host, description, city } = currentOffer;

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
            <Map offers={[currentOffer, ...nearbyOffers]} activeOfferId={currentId} city={city} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {<OfferCardList offers={nearbyOffers} container={Container.Properties} />}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { PropertyScreen };
export default connector(PropertyScreen);
