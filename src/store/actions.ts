import { Cities, AuthorizationStatus } from '../const';
import { ActionType } from '../types/actions';
import { Offers } from '../types/offer';
import { UserData } from '../types/user-data';

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

export const loadUserData = (userData: UserData) => ({
  type: ActionType.LoadUserData,
  payload: userData,
} as const);
