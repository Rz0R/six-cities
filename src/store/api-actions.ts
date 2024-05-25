import { toast } from 'react-toastify';
import { AxiosError, isAxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { ThunkActionResult } from '../types/actions';
import {
  loadOffers,
  updateOffer,
  requireAuthorization,
  requireLogout,
  loadUserData,
  removeUserData,
  loadOfferById,
  setCurrentOfferDataNotFoundStatus,
  loadNearbyOffers,
  updateNearbyOffers,
  setNearbyOffersDataNotFound,
  loadComments,
  setCommentsDataNotFoundStatus,
  setPostCommentStatus,
} from './actions';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, PostCommentStatus } from '../const';
import { Offers, Offer } from '../types/offer';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { Comments } from '../types/comments';

type DetailMessageType = {
  type: string;
  message: string;
};

enum ERROR_MESSAGES {
  AUTH_FAIL_MESSAGE = "Don't forget to login",
  LOGIN_FAIL_MESSAGE = 'Fail login',
  POST_COMMENT_FAIL_MESSAGE = 'Fail post comment',
  UNKNOWN_ERROR = 'Oops, something went wrong!',
}

const errorHandler = (err: AxiosError<DetailMessageType>) => {
  if (isAxiosError(err) && err.response?.status === StatusCodes.UNAUTHORIZED) {
    toast.warn(ERROR_MESSAGES.AUTH_FAIL_MESSAGE);
  } else {
    toast.error(err?.response?.data?.message || ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};

export const fetchOfferAction =
  (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<Offers>(APIRoute.Offers);
      dispatch(loadOffers(data));
    } catch (err) {
      errorHandler(err as AxiosError<DetailMessageType>);
    }
  };

export const checkAuthAction =
  (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(loadUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (err) {
      errorHandler(err as AxiosError<DetailMessageType>);
    }
  };

export const loginAction =
  ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, {
        email,
        password,
      });
      saveToken(data?.token || '');
      dispatch(loadUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (err) {
      errorHandler(err as AxiosError<DetailMessageType>);
    }
  };

export const logoutAction = (): ThunkActionResult => async (dispatch, _getState, api) => {
  try {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(removeUserData());
    dispatch(requireLogout(AuthorizationStatus.NoAuth));
    const { data: offersData } = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffers(offersData));
  } catch (err) {
    errorHandler(err as AxiosError<DetailMessageType>);
  }
};

export const fetchOfferByIdAction =
  (id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<Offer>(`${APIRoute.Hotels}/${id}`);
      dispatch(loadOfferById(data));
    } catch (err) {
      dispatch(setCurrentOfferDataNotFoundStatus());
      errorHandler(err as AxiosError<DetailMessageType>);
    }
  };

export const fetchNearbyOffersAction =
  (id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<Offers>(`${APIRoute.Hotels}/${id}/nearby`);
      dispatch(loadNearbyOffers(data));
    } catch (err) {
      dispatch(setNearbyOffersDataNotFound());
      errorHandler(err as AxiosError<DetailMessageType>);
    }
  };

export const fetchCommentsAction =
  (id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
      dispatch(loadComments(data));
    } catch (err) {
      dispatch(setCommentsDataNotFoundStatus());
      errorHandler(err as AxiosError<DetailMessageType>);
    }
  };

export const postCommentAction =
  (id: string, review: { comment: string; rating: string }): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      dispatch(setPostCommentStatus(PostCommentStatus.Posting));
      const { data } = await api.post<Comments>(`${APIRoute.Comments}/${id}`, review);
      dispatch(loadComments(data));
      dispatch(setPostCommentStatus(PostCommentStatus.Success));
    } catch (err) {
      dispatch(setPostCommentStatus(PostCommentStatus.Idle));
      errorHandler(err as AxiosError<DetailMessageType>);
    }
  };

export const toggleIsFavoriteAction =
  (id: string, favoriteStatus: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${favoriteStatus}`);
      dispatch(updateOffer(data));
      dispatch(loadOfferById(data));
      dispatch(updateNearbyOffers(data));
    } catch (err) {
      errorHandler(err as AxiosError<DetailMessageType>);
    }
  };
