import { Actions, ActionType } from '../types/actions';
import { State } from '../types/state';
import { AuthorizationStatus, Cities } from '../const';

const initialState: State = {
  selectedCity: Cities.Paris,
  offers: [],
  currentOfferData: {
    currentOffer: null,
    isCurrentOfferLoaded: false,
  },
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  userData: null,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return { ...state, selectedCity: action.payload };
    case ActionType.LoadOffers:
      return { ...state, offers: action.payload };
    case ActionType.LoadOfferById:
      return {
        ...state,
        currentOfferData: {
          currentOffer: action.payload,
          isCurrentOfferLoaded: true,
        },
      };
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
        isDataLoaded: true,
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

export { reducer };
