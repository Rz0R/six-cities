import { offers } from '../mocks/offers';
import { Actions, ActionType } from '../types/actions';
import { State } from '../types/state';

const initialState = {
  selectetCity: 'Amsterdam',
  offers: offers,
};

const reducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case ActionType.SelectCity:
      return { ...state, selectCity: action.payload };
    case ActionType.LoadOffers:
      return { ...state, offers: action.payload };
    default:
      return state;
  }
};

export { reducer };
