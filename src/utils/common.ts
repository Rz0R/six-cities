import { STARS_NUMBER, Cities, SortTypes } from '../const';
import { Offer, Offers } from '../types/offer';

export const getRatingStyle = (rating: number) => ({
  width: `${(100 / STARS_NUMBER) * rating}%`,
});

export const ratingValues = Array.from(
  { length: STARS_NUMBER },
  (_, i) => i + 1,
).sort((a, b) => b - a);

export const getSelectedCityOffers = (offers: Offers, selectedCity: string) =>
  offers.filter((offer) => offer.city.name === selectedCity);

export const getOfferById = (offers: Offers, id: string) =>
  offers.find((offer) => offer.id === id);

export const citiesList: Cities[] = Object.entries(Cities).map(
  ([_, value]) => value,
);

export const sortTypesList: SortTypes[] = Object.entries(SortTypes).map(
  ([_, value]) => value,
);

export const replaceOffer = (offers: Offers, updatedOffer: Offer) =>
  offers.map((offer) => {
    if (offer.id === updatedOffer.id) {
      return updatedOffer;
    } else {
      return offer;
    }
  });

export const getSortedOffers = {
  [SortTypes.POPULAR]: (offers: Offers) => offers,
  [SortTypes.PRICE_HIGH_TO_LOW]: (offers: Offers) =>
    offers.sort((a, b) => b.price - a.price),
  [SortTypes.PRICE_LOW_TO_HIGH]: (offers: Offers) =>
    offers.sort((a, b) => a.price - b.price),
  [SortTypes.RATE]: (offers: Offers) =>
    offers.sort((a, b) => b.rating - a.rating),
};
