import { createSelector } from 'reselect';
import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Offers } from '../../types/offer';
import { getSelectedCity } from '../app-state/selectors';
import { getSelectedCityOffers } from '../../utils/common';

export const getOffers = (state: State): Offers => state[NameSpace.offers].offers;
export const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.offers].isOffersDataLoaded;

export const getFilteredOffers = createSelector(
  getOffers,
  getSelectedCity,
  (offers, selectedCity) => getSelectedCityOffers(offers, selectedCity),
);
