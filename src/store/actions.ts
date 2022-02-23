import { Cities, AuthorizationStatus } from '../const';
import { ActionType } from '../types/actions';
import { Comments } from '../types/comments';
import { Offers, Offer } from '../types/offer';
import { UserData } from '../types/user-data';

export const selectCity = (city: Cities) => ({
  type: ActionType.SelectCity,
  payload: city,
} as const);

export const loadOffers = (offers: Offers) => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);

export const loadOfferById = (offer: Offer) => ({
  type: ActionType.LoadOfferById,
  payload: offer,
} as const);

export const removeCurrentOfferData = () => ({
  type: ActionType.RemoveCurrentOfferData,
} as const);

export const setCurrentOfferDataNotFoundStatus = () => ({
  type: ActionType.SetCurrentOfferDataNotFoundStatus,
} as const);

export const loadNearbyOffers = (offers: Offers) => ({
  type: ActionType.LoadNearbyOffers,
  payload: offers,
} as const);

export const removeNearbyOffersData = () => ({
  type: ActionType.RemoveNearbyOffersData,
} as const);

export const setNearbyOffersDataNotFound = () => ({
  type: ActionType.SetNearbyOffersDataNotFound,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireLogout,
  payload: authStatus,
} as const);

export const loadUserData = (userData: UserData) => ({
  type: ActionType.LoadUserData,
  payload: userData,
} as const);

export const removeUserData = () => ({
  type: ActionType.RemoveUserData,
} as const);

export const loadComments = (comments: Comments) => ({
  type: ActionType.LoadComments,
  payload: comments,
} as const);

export const removeCommentsData = () => ({
  type: ActionType.RemoveCommentsData,
} as const);

export const setCommentsDataNotFoundStatus = () => ({
  type: ActionType.SetCommentsDataNotFoundStatus,
} as const);
