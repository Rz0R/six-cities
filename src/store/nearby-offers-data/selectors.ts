import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Offers } from '../../types/offer';
import { LoadingStatus } from '../../const';

export const getNearbyOffers = (state: State): Offers =>
  state[NameSpace.nearbyOffers].nearbyOffers;
export const getNearbyOffersLoadingStatus = (state: State): LoadingStatus =>
  state[NameSpace.nearbyOffers].isNearbyOffersLoaded;
