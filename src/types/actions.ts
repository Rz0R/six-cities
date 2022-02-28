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
  SelectCity = 'main/SelectCity',
  LoadOffers = 'main/LoadOffers',
  UpdateOffers = 'main/UpdateOffers',
  LoadOfferById = 'property/LoadOfferById',
  RemoveCurrentOfferData = 'property/RemoveCurrentOfferData',
  SetCurrentOfferDataNotFoundStatus = 'property/SetCurrentOfferDataNotFoundStatus',
  LoadNearbyOffers = 'property/LoadNearbyOffers',
  UpdateNearbyOffers = 'property/UpdateNearbyOffers',
  RemoveNearbyOffersData = 'propery/RemoveNearbyOffersData',
  SetNearbyOffersDataNotFound = 'property/SetNearbyOffersDataNotFound',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  LoadUserData = 'user/LoadUserData',
  RemoveUserData = 'user/RemoveUserData',
  LoadComments = 'property/LoadComments',
  RemoveCommentsData = 'property/RemoveCommentsData',
  SetCommentsDataNotFoundStatus = 'property/SetCommentsDataNotFoundStatus',
  SetPostCommentStatus = 'property/SetPostCommentStatus',
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
