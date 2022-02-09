import { STARS_NUMBER, Cities, SortTypes } from '../const';
import { Offers } from '../types/offer';

export const getRatingStyle = (rating: number) => ({ width: `${100 / STARS_NUMBER * rating}%` });

export const ratingValues = Array.from({ length: STARS_NUMBER }, (_, i) => i + 1).sort((a, b) => b - a);

export const getSelectedCityOffers = (offers: Offers, selectedCity: string) => offers.filter((offer) => offer.city.name === selectedCity);

export const citiesList: Cities[] = Object.entries(Cities).map(([_, value]) => value);

export const sortTypesList: SortTypes[] = Object.entries(SortTypes).map(([_, value]) => value);
