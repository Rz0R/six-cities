import OfferCard from '../offer-card/offer-card';
import { Offers, Offer } from '../../types/offer';
import { useState } from 'react';

type OfferCardListProps = {
  offers: Offers,
}

function OfferCardList({ offers }: OfferCardListProps): JSX.Element {

  type Id = string | null;

  const [id, setId] = useState<Id>();
  const offerComponents = offers.map((offer: Offer) => <OfferCard key={offer.id} offer={offer} setAciveCard={(id: Id) => setId(id)} />);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offerComponents}
    </div>
  );

}

export default OfferCardList;
