import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import classNames from 'classnames';
import NoPlaces from './no-places/no-places';
import OfferCardList from '../offer-card-list/offer-card-list';
import Map from '../map/map';
import Locations from './locations/locations';
import PlacesSort from './places-sort/places-sort';
import Auth from '../auth/auth';
import { Cities, Container, SortTypes, CITY_LOCATIONS } from '../../const';
import { selectCity } from '../../store/actions';
import { getSelectedCityOffers, sortTypesList, getSortedOffers } from '../../utils/common';
import { Id } from '../../types/offer';
import Logo from '../logo/logo';
import { getOffers } from '../../store/offers-data/selectors';
import { getSelectedCity } from '../../store/app-state/selectors';

function MainScreen(): JSX.Element {

  const dispatch = useDispatch();

  const allOffers = useSelector(getOffers);
  const selectedCity = useSelector(getSelectedCity);
  const offers = getSelectedCityOffers(allOffers, selectedCity);
  const isAnyOffers = offers.length > 0;

  const onCityChange = (city: Cities) => {
    dispatch(selectCity(city));
  };

  const [sortMenuActive, setSortMenuActive] = useState(false);
  const [currentSortType, setCurrentSortType] = useState<SortTypes>(SortTypes.POPULAR);
  const [cardId, setCardId] = useState<Id>(null);

  const sortedOffers = getSortedOffers[currentSortType]([...offers]);

  const placeCounter = offers.length;

  const hideSortMenu = () => setSortMenuActive(false);

  const currentCity = (CITY_LOCATIONS.find((city) => city.name === selectedCity)) || CITY_LOCATIONS[0];

  return (
    <div
      className="page page--gray page--main"
      onClick={hideSortMenu}
    >
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
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations selectedCity={selectedCity} onCiyChange={onCityChange} />
        <div className="cities">
          <div className={classNames(
            'cities__places-container container',
            { 'cities__places-container--empty': isAnyOffers },
          )}
          >
            {!isAnyOffers && <NoPlaces selectedCity={selectedCity} />}
            {isAnyOffers && (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{placeCounter} places to stay in {selectedCity}</b>
                <PlacesSort
                  isMenuActive={sortMenuActive}
                  currentSortType={currentSortType}
                  sortTypesList={sortTypesList}
                  onSortMenuClick={setSortMenuActive}
                  onSortMenuItemClick={setCurrentSortType}
                />
                <OfferCardList
                  container={Container.Main}
                  offers={sortedOffers}
                  setCardId={setCardId}
                />
              </section>)}

            <div className="cities__right-section">
              <section className='map cities__map'>
                <Map offers={offers} activeOfferId={cardId} city={currentCity} />
              </section>
            </div>
          </div>
        </div>
      </main >
    </div >
  );
}

export default MainScreen;
