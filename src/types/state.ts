import { Cities, AuthorizationStatus } from '../const';
import { Offers } from './offer';
import { UserData } from './user-data';

export type State = {
  selectedCity: Cities,
  offers: Offers,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  userData: UserData,
};
