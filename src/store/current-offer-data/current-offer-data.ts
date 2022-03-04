import { Actions, ActionType } from '../../types/actions';
import { CurrentOfferData } from '../../types/current-offer-data';
import { LoadingStatus } from '../../const';

const initialState: CurrentOfferData = {
  currentOffer: null,
  isCurrentOfferLoaded: LoadingStatus.Idle,
};

export const currentOfferData = (state = initialState, action: Actions): CurrentOfferData => {
  switch (action.type) {
    case ActionType.LoadOfferById:
      return {
        ...state,
        currentOffer: action.payload,
        isCurrentOfferLoaded: LoadingStatus.Success,
      };
    case ActionType.RemoveCurrentOfferData:
      return {
        ...state,
        currentOffer: null,
        isCurrentOfferLoaded: LoadingStatus.Idle,
      };
    case ActionType.SetCurrentOfferDataNotFoundStatus:
      return {
        ...state,
        currentOffer: null,
        isCurrentOfferLoaded: LoadingStatus.NotFound,
      };
    default:
      return state;
  }
};
