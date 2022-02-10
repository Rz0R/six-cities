import OfferCard from '../offer-card/offer-card';
import { Offers, Offer, Id } from '../../types/offer';
import { Container } from '../../const';

type OfferCardListProps = {
  container: Container,
  offers: Offers,
  setCardId?: React.Dispatch<React.SetStateAction<Id>>,
}

function OfferCardList({ offers, container, setCardId }: OfferCardListProps): JSX.Element {

  const offerComponents = offers
    .map((offer: Offer) => <OfferCard key={offer.id} offer={offer} container={container} setAciveCard={setCardId} />);

  const offerCardListClasses = container === Container.Main ? 'cities__places-list places__list tabs__content'
    : container === Container.Properties ? 'near-places__list places__list'
      : 'favorites__places';

  return (
    <div className={offerCardListClasses}>
      {offerComponents}
    </div>
  );

}

export default OfferCardList;
