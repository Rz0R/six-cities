import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { Action } from 'redux';
import { State } from './state';

export enum ActionType {
  SelectCity = 'APP/SelectCity',
  LoadOffers = 'OFFERS/LoadOffers',
  UpdateOffers = 'OFFERS/UpdateOffers',
  LoadOfferById = 'CURRENT_OFFER/LoadOfferById',
  RemoveCurrentOfferData = 'CURRENT_OFFER/RemoveCurrentOfferData',
  SetCurrentOfferDataNotFoundStatus = 'CURRENT_OFFER/SetCurrentOfferDataNotFoundStatus',
  LoadNearbyOffers = 'NEARBY_OFFERS/LoadNearbyOffers',
  UpdateNearbyOffers = 'NEARBY_OFFERS/UpdateNearbyOffers',
  RemoveNearbyOffersData = 'NEARBY_OFFERS/RemoveNearbyOffersData',
  SetNearbyOffersDataNotFound = 'NEARBY_OFFERS/SetNearbyOffersDataNotFound',
  RequireAuthorization = 'USER/requireAuthorization',
  RequireLogout = 'USER/requireLogout',
  LoadUserData = 'USER/LoadUserData',
  RemoveUserData = 'USER/RemoveUserData',
  LoadComments = 'COMMENTS/LoadComments',
  RemoveCommentsData = 'COMMENTS/RemoveCommentsData',
  SetCommentsDataNotFoundStatus = 'COMMENTS/SetCommentsDataNotFoundStatus',
  SetPostCommentStatus = 'COMMENTS/SetPostCommentStatus',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
