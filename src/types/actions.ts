import { selectCity, loadOffers, requireAuthorization, requireLogout, loadUserData, removeUserData, loadOfferById } from '../store/actions';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  SelectCity = 'main/SelectCity',
  LoadOffers = 'main/LoadOffers',
  LoadOfferById = 'main/LoadOfferById',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  LoadUserData = 'user/LoadUserData',
  RemoveUserData = 'user/RemoveUserData',
}

export type Actions =
  | ReturnType<typeof selectCity>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof loadOfferById>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof loadUserData>
  | ReturnType<typeof removeUserData>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
