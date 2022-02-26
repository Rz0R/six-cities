import OfferCard from '../offer-card/offer-card';
import { Offers, Offer, Id } from '../../types/offer';
import { Container } from '../../const';
import classNames from 'classnames';

type OfferCardListProps = {
  container: Container,
  offers: Offers,
  setCardId?: React.Dispatch<React.SetStateAction<Id>>,
}

function OfferCardList({ offers, container, setCardId }: OfferCardListProps): JSX.Element {

  const offerComponents = offers
    .map((offer: Offer) => <OfferCard key={offer.id} offer={offer} container={container} setAciveCard={setCardId} />);

  return (
    <div
      className={classNames(
        { 'cities__places-list places__list tabs__content': container === Container.Main },
        { 'near-places__list places__list': container === Container.Properties },
        { 'favorites__places': container === Container.Favorites },
      )}
    >
      {offerComponents}
    </div>
  );
}

export default OfferCardList;
