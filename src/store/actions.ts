import { createAction } from '@reduxjs/toolkit';
import { Cities, AuthorizationStatus, PostCommentStatus } from '../const';
import { ActionType } from '../types/actions';
import { Comments } from '../types/comments';
import { Offers, Offer } from '../types/offer';
import { UserData } from '../types/user-data';

export const selectCity = createAction(ActionType.SelectCity, (city: Cities) => ({
  payload: city,
}));

export const loadOffers = createAction(ActionType.LoadOffers, (offers: Offers) => ({
  payload: offers,
}));

export const loadOfferById = createAction(ActionType.LoadOfferById, (offer: Offer) => ({
  payload: offer,
}));

export const removeCurrentOfferData = createAction(ActionType.RemoveCurrentOfferData);

export const setCurrentOfferDataNotFoundStatus = createAction(
  ActionType.SetCurrentOfferDataNotFoundStatus,
);

export const loadNearbyOffers = createAction(ActionType.LoadNearbyOffers, (offers: Offers) => ({
  payload: offers,
}));

export const removeNearbyOffersData = createAction(ActionType.RemoveNearbyOffersData);

export const setNearbyOffersDataNotFound = createAction(ActionType.SetNearbyOffersDataNotFound);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }),
);

export const requireLogout = createAction(
  ActionType.RequireLogout,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }),
);

export const loadUserData = createAction(ActionType.LoadUserData, (userData: UserData) => ({
  payload: userData,
}));

export const removeUserData = createAction(ActionType.RemoveUserData);

export const loadComments = createAction(ActionType.LoadComments, (comments: Comments) => ({
  payload: comments,
}));

export const removeCommentsData = createAction(ActionType.RemoveCommentsData);

export const setCommentsDataNotFoundStatus = createAction(ActionType.SetCommentsDataNotFoundStatus);

export const setPostCommentStatus = createAction(
  ActionType.SetPostCommentStatus,
  (postCommentStatus: PostCommentStatus) => ({
    payload: postCommentStatus,
  }),
);

export const updateOffer = createAction(ActionType.UpdateOffers, (offer: Offer) => ({
  payload: offer,
}));

export const updateNearbyOffers = createAction(ActionType.UpdateNearbyOffers, (offer: Offer) => ({
  payload: offer,
}));
