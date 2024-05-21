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
import { toast } from 'react-toastify';
import { Comments } from '../types/comments';

const AUTH_FAIL_MESSAGE = "Don't forget to login";
const POST_COMMENT_FAIL_MESSAGE = 'Fail post comment';

export const fetchOfferAction =
  (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffers(data));
  };

export const checkAuthAction =
  (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    if (data) {
      dispatch(loadUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } else {
      toast.info(AUTH_FAIL_MESSAGE);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  };

export const loginAction =
  ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data?.token || '');
    dispatch(loadUserData(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    const { data: offersData } = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffers(offersData));
  };

export const logoutAction =
  (): ThunkActionResult => async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(removeUserData());
    dispatch(requireLogout(AuthorizationStatus.NoAuth));
    const { data: offersData } = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffers(offersData));
  };

export const fetchOfferByIdAction =
  (id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<Offer>(`${APIRoute.Hotels}/${id}`);
      dispatch(loadOfferById(data));
    } catch {
      dispatch(setCurrentOfferDataNotFoundStatus());
    }
  };

export const fetchNearbyOffersAction =
  (id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<Offers>(`${APIRoute.Hotels}/${id}/nearby`);
      dispatch(loadNearbyOffers(data));
    } catch {
      dispatch(setNearbyOffersDataNotFound());
    }
  };

export const fetchCommentsAction =
  (id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
      dispatch(loadComments(data));
    } catch {
      dispatch(setCommentsDataNotFoundStatus());
    }
  };

export const postCommentAction =
  (
    id: string,
    review: { comment: string; rating: string },
  ): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      dispatch(setPostCommentStatus(PostCommentStatus.Posting));
      const { data } = await api.post<Comments>(
        `${APIRoute.Comments}/${id}`,
        review,
      );
      dispatch(loadComments(data));
      dispatch(setPostCommentStatus(PostCommentStatus.Success));
    } catch {
      toast.info(POST_COMMENT_FAIL_MESSAGE);
      dispatch(setPostCommentStatus(PostCommentStatus.Idle));
    }
  };

export const toggleIsFavoriteAction =
  (id: string, favoriteStatus: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<Offer>(
      `${APIRoute.Favorite}/${id}/${favoriteStatus}`,
    );
    dispatch(updateOffer(data));
    dispatch(loadOfferById(data));
    dispatch(updateNearbyOffers(data));
  };
