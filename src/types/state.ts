import { Cities, AuthorizationStatus, LoadingStatus } from '../const';
import { Offers, Offer } from './offer';
import { UserData } from './user-data';

export type State = {
  selectedCity: Cities,
  offers: Offers,
  currentOfferData: {
    currentOffer: Offer | null,
    isCurrentOfferLoaded: LoadingStatus,
  },
  nearbyOffersData: {
    nearbyOffers: Offers,
    isNearbyOffersLoaded: LoadingStatus,
  }
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  userData: UserData,
};
