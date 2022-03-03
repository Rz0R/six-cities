import { OffersData } from '../../types/offer';
import { Actions, ActionType } from '../../types/actions';
import { replaceOffer } from '../../utils/common';

const initialState: OffersData = {
  offers: [],
  isOffersDataLoaded: false,
};

export const offersData = (state = initialState, action: Actions): OffersData => {
  switch (action.type) {
    case ActionType.LoadOffers:
      return {
        ...state,
        offers: action.payload,
        isOffersDataLoaded: true,
      };
    case ActionType.UpdateOffers:
      return {
        ...state,
        offers: replaceOffer(state.offers, action.payload),
      };
    default:
      return state;
  }
};
