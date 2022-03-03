import { Cities } from '../../const';
import { Actions, ActionType } from '../../types/actions';
import { AppState } from '../../types/app-state';

const initialState: AppState = {
  selectedCity: Cities.Paris,
};

export const appState = (state = initialState, action: Actions): AppState => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {
        ...state,
        selectedCity: action.payload,
      };
    default:
      return state;
  }
};
