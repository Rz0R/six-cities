import { ThunkActionResult } from '../types/actions';
import { loadOffers, requireAuthorization, requireLogout, loadUserData, removeUserData } from './actions';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus } from '../const';
import { BackendOffer } from '../types/offer';
import { BackendUser } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { adaptOffersToClient, adaptUserDataToClient } from '../services/adapter';
import { toast } from 'react-toastify';

const AUTH_FAIL_MESSAGE = 'Don\'t forget to login';

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
