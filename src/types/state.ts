import { Cities, AuthorizationStatus } from '../const';
import { Offers, Offer } from './offer';
import { UserData } from './user-data';

export type State = {
  selectedCity: Cities,
  offers: Offers,
  currentOfferData: {
    currentOffer: Offer | null,
    isCurrentOfferLoaded: boolean,
  },
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  userData: UserData,
};
