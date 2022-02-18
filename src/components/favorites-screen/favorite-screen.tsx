import OfferCardList from '../offer-card-list/offer-card-list';
import { State } from '../../types/state';
import { Container } from '../../const';
import { connect, ConnectedProps } from 'react-redux';
import Logo from '../logo/logo';

const mapStateToProps = ({ offers }: State) => ({ offers: offers });

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function FavoriteScreen({ offers }: ConnectedComponentProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const allCities = [...new Set(favoriteOffers.filter((offer) => offer.isFavorite).map((offer) => offer.city.name))];

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="/"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                allCities.map((city) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="/">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {
                        <OfferCardList offers={favoriteOffers.filter((offer) => offer.city.name === city)} container={Container.Favorites} />
                      }
                    </div>
                  </li>
                ))
              }
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>

  );
}

export { FavoriteScreen };
export default connector(FavoriteScreen);
