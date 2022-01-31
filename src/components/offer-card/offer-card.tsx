import { Offer } from '../../types/offer';
import { Container } from '../../const';

type OfferCardType = {
  offer: Offer,
  container: Container,
  setAciveCard: (id: string | null) => void,
};

function OfferCard({ offer, container, setAciveCard }: OfferCardType): JSX.Element {

  const { title, previewImage, price, type, isFavorite, isPremium, rating } = offer;
  const bookMarkClasses = isFavorite ?
    'place-card__bookmark-button place-card__bookmark-button--active button' :
    'place-card__bookmark-button button';
  const raitingStyle = { width: `${100 / 5 * rating}%` };

  return (
    <article
      className={`place-card ${container === Container.Main ? 'cities__place-card' : 'favorites__card'}`}
      onMouseOver={() => setAciveCard(offer.id)}
      onMouseLeave={() => setAciveCard(null)}
    >
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`place-card__image-wrapper ${container === Container.Main ? 'cities__image-wrapper' : 'favorites__image-wrapper'}`}>
        <a href="/">
          <img
            className="place-card__image"
            src={previewImage}
            width={container === Container.Main ? 260 : 150}
            height={container === Container.Main ? 200 : 110}
            alt={title}
          />
        </a>
      </div>
      <div className={`place-card__info ${container === Container.Favorites ? 'favorites__card-info' : ''}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={bookMarkClasses}
            type="button"
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
          <a href="/">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
