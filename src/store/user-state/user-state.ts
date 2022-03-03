import { UserState } from '../../types/user-data';
import { Actions, ActionType } from '../../types/actions';
import { AuthorizationStatus } from '../../const';

const initialState: UserState = {
  userData: null,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userState = (state = initialState, action: Actions): UserState => {
  switch (action.type) {
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.RequireLogout:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LoadUserData:
      return {
        ...state,
        userData: action.payload,
      };
    case ActionType.RemoveUserData:
      return {
        ...state,
        userData: null,
      };
    default:
      return state;
  }
};
