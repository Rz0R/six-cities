import {
  selectCity,
  loadOffers,
  updateOffer,
  requireAuthorization,
  requireLogout,
  loadUserData,
  removeUserData,
  loadOfferById,
  removeCurrentOfferData,
  setCurrentOfferDataNotFoundStatus,
  loadNearbyOffers,
  updateNearbyOffers,
  removeNearbyOffersData,
  setNearbyOffersDataNotFound,
  loadComments,
  removeCommentsData,
  setCommentsDataNotFoundStatus,
  setPostCommentStatus
} from '../store/actions';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
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

export type Actions =
  | ReturnType<typeof selectCity>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof updateOffer>
  | ReturnType<typeof loadOfferById>
  | ReturnType<typeof removeCurrentOfferData>
  | ReturnType<typeof setCurrentOfferDataNotFoundStatus>
  | ReturnType<typeof loadNearbyOffers>
  | ReturnType<typeof updateNearbyOffers>
  | ReturnType<typeof removeNearbyOffersData>
  | ReturnType<typeof setNearbyOffersDataNotFound>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof loadUserData>
  | ReturnType<typeof removeUserData>
  | ReturnType<typeof loadComments>
  | ReturnType<typeof removeCommentsData>
  | ReturnType<typeof setCommentsDataNotFoundStatus>
  | ReturnType<typeof setPostCommentStatus>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
