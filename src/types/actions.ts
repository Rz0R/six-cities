import {
  selectCity,
  loadOffers,
  requireAuthorization,
  requireLogout,
  loadUserData,
  removeUserData,
  loadOfferById,
  removeCurrentOfferData,
  setCurrentOfferDataNotFoundStatus,
  loadNearbyOffers,
  removeNearbyOffersData,
  setNearbyOffersDataNotFound
} from '../store/actions';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  SelectCity = 'main/SelectCity',
  LoadOffers = 'main/LoadOffers',
  LoadOfferById = 'property/LoadOfferById',
  RemoveCurrentOfferData = 'property/RemoveCurrentOfferData',
  SetCurrentOfferDataNotFoundStatus = 'property/SetCurrentOfferDataNotFoundStatus',
  LoadNearbyOffers = 'property/LoadNearbyOffers',
  RemoveNearbyOffersData = 'propery/RemoveNearbyOffersData',
  SetNearbyOffersDataNotFound = 'property/SetNearbyOffersDataNotFound',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  LoadUserData = 'user/LoadUserData',
  RemoveUserData = 'user/RemoveUserData',
}

export type Actions =
  | ReturnType<typeof selectCity>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof loadOfferById>
  | ReturnType<typeof removeCurrentOfferData>
  | ReturnType<typeof setCurrentOfferDataNotFoundStatus>
  | ReturnType<typeof loadNearbyOffers>
  | ReturnType<typeof removeNearbyOffersData>
  | ReturnType<typeof setNearbyOffersDataNotFound>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof loadUserData>
  | ReturnType<typeof removeUserData>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
