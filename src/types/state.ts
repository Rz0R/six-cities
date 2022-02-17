import { Cities, AuthorizationStatus } from '../const';
import { Offers } from './offer';

export type State = {
  selectedCity: Cities,
  offers: Offers,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};
