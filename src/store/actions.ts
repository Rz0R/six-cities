import { Cities, AuthorizationStatus } from '../const';
import { ActionType } from '../types/actions';
import { Offers } from '../types/offer';

export const selectCity = (city: Cities) => ({
  type: ActionType.SelectCity,
  payload: city,
} as const);

export const loadOffers = (offers: Offers) => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);
