import { Offers } from './offer';
import { LoadingStatus } from '../const';

export type NearbyOffersData = {
  nearbyOffers: Offers;
  isNearbyOffersLoaded: LoadingStatus;
};
