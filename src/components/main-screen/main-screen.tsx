import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import OfferCardList from '../offer-card-list/offer-card-list';
import Map from '../map/map';
import Locations from './locations/locations';
import PlacesSort from './places-sort/places-sort';
import Auth from '../auth/auth';
import { Cities, Container, SortTypes } from '../../const';
import { State } from '../../types/state';
import { selectCity } from '../../store/actions';
import { Actions } from '../../types/actions';
import { getSelectedCityOffers, sortTypesList, getSortedOffers } from '../../utils/common';
import { Id } from '../../types/offer';
import { useState } from 'react';
import Logo from '../logo/logo';

type MainScreenProps = {
  offerCardsCount: number,
}

const mapStateToProps = ({ offers, selectedCity }: State) => ({
  offers: getSelectedCityOffers(offers, selectedCity),
  selectedCity: selectedCity,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onCityChange(city: Cities) {
    dispatch(selectCity(city));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainScreenProps;

function MainScreen({ offerCardsCount, offers, selectedCity, onCityChange }: ConnectedComponentProps): JSX.Element {

  const [sortMenuActive, setSortMenuActive] = useState(false);
  const [currentSortType, setCurrentSortType] = useState<SortTypes>(SortTypes.POPULAR);
  const [cardId, setCardId] = useState<Id>(null);

  const sortedOffers = getSortedOffers[currentSortType]([...offers]);

  const placeCounter = offers.length;

  const hideSortMenu = () => setSortMenuActive(false);

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
          <div className="cities__places-container container">
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
            </section>
            <div className="cities__right-section">
              <section className='map cities__map'>
                <Map offers={offers} selectedCity={selectedCity} activeOfferId={cardId} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { MainScreen };
export default connector(MainScreen);
