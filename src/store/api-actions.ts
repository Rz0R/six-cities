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
  setPostCommentStatus
} from './actions';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, PostCommentStatus } from '../const';
import { BackendOffer } from '../types/offer';
import { BackendUser } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { adaptOffersToClient, adaptOfferToClient, adaptUserDataToClient, adaptCommentsDataToClient } from '../services/adapter';
import { toast } from 'react-toastify';
import { BackendComments } from '../types/comments';

const AUTH_FAIL_MESSAGE = 'Don\'t forget to login';
const POST_COMMENT_FAIL_MESSAGE = 'Fail post comment';

export const fetchOfferAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<BackendOffer[]>(APIRoute.Offers);
    dispatch(loadOffers(adaptOffersToClient(data)));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<BackendUser>(APIRoute.Login);
    if (data) {
      dispatch(loadUserData(adaptUserDataToClient(data)));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } else {
      toast.info(AUTH_FAIL_MESSAGE);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  };

export const loginAction = ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<BackendUser>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(loadUserData(adaptUserDataToClient(data)));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(removeUserData());
    dispatch(requireLogout(AuthorizationStatus.NoAuth));
  };

export const fetchOfferByIdAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<BackendOffer>(`${APIRoute.Hotels}/${id}`);
      dispatch(loadOfferById(adaptOfferToClient(data)));
    } catch {
      dispatch(setCurrentOfferDataNotFoundStatus());
    }
  };

export const fetchNearbyOffersAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<BackendOffer[]>(`${APIRoute.Hotels}/${id}/nearby`);
      dispatch(loadNearbyOffers(adaptOffersToClient(data)));
    } catch {
      dispatch(setNearbyOffersDataNotFound());
    }
  };

export const fetchCommentsAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<BackendComments>(`${APIRoute.Comments}/${id}`);
      dispatch(loadComments(adaptCommentsDataToClient(data)));
    } catch {
      dispatch(setCommentsDataNotFoundStatus());
    }
  };

export const postCommentAction = (id: string, review: { comment: string, rating: string }): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      dispatch(setPostCommentStatus(PostCommentStatus.Posting));
      const res = await api.post<BackendComments>(`${APIRoute.Comments}/${id}`, review);
      dispatch(loadComments(adaptCommentsDataToClient(res.data)));
      dispatch(setPostCommentStatus(PostCommentStatus.Success));
    } catch {
      toast.info(POST_COMMENT_FAIL_MESSAGE);
      dispatch(setPostCommentStatus(PostCommentStatus.Idle));
    }
  };


export const toggleIsFavoriteAction = (id: string, favoriteStatus: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<BackendOffer>(`${APIRoute.Favorite}/${id}/${favoriteStatus}`);
    const adaptedData = adaptOfferToClient(data);
    dispatch(updateOffer(adaptedData));
    dispatch(loadOfferById(adaptedData));
    dispatch(updateNearbyOffers(adaptedData));
  };
