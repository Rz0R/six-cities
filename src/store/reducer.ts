import { offers } from '../mocks/offers';
import { Actions, ActionType } from '../types/actions';
import { State } from '../types/state';
import { AuthorizationStatus, Cities } from '../const';

const initialState: State = {
  selectedCity: Cities.Amsterdam,
  offers: offers,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case ActionType.SelectCity:
      return { ...state, selectedCity: action.payload };
    case ActionType.LoadOffers:
      return { ...state, offers: action.payload };
    case ActionType.RequireAuthorization:
      return { ...state, authorizationStatus: action.payload };
    default:
      return state;
  }
};

export { reducer };
