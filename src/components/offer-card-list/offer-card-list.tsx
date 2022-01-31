import OfferCard from '../offer-card/offer-card';
import { Offers, Offer } from '../../types/offer';
import { useState } from 'react';
import { Container } from '../../const';

type OfferCardListProps = {
  container: Container,
  offers: Offers,
}

function OfferCardList({ offers, container }: OfferCardListProps): JSX.Element {

  type Id = string | null;

  const [id, setId] = useState<Id>();
  const offerComponents = offers.map((offer: Offer) => <OfferCard key={offer.id} offer={offer} container={container} setAciveCard={(id: Id) => setId(id)} />);

  return (
    <div className={container === Container.Main ? 'cities__places-list places__list tabs__content' : 'favorites__places'}>
      {offerComponents}
    </div>
  );

}

export default OfferCardList;