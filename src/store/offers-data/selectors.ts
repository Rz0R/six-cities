import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Offers } from '../../types/offer';

export const getOffers = (state: State): Offers => state[NameSpace.offers].offers;
export const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.offers].isOffersDataLoaded;
