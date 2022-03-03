import { Actions, ActionType } from '../../types/actions';
import { NearbyOffersData } from '../../types/nearby-offers-data';
import { LoadingStatus } from '../../const';
import { replaceOffer } from '../../utils/common';

const initialState: NearbyOffersData = {
  nearbyOffers: [],
  isNearbyOffersLoaded: LoadingStatus.Idle,
};

export const nearbyOffersData = (state = initialState, action: Actions): NearbyOffersData => {
  switch (action.type) {
    case ActionType.LoadNearbyOffers:
      return {
        ...state,
        nearbyOffers: action.payload,
        isNearbyOffersLoaded: LoadingStatus.Success,
      };
    case ActionType.UpdateNearbyOffers:
      return {
        ...state,
        nearbyOffers: replaceOffer(state.nearbyOffers, action.payload),
      };
    case ActionType.RemoveNearbyOffersData:
      return {
        ...state,
        nearbyOffers: [],
        isNearbyOffersLoaded: LoadingStatus.Idle,
      };
    case ActionType.SetNearbyOffersDataNotFound:
      return {
        ...state,
        nearbyOffers: [],
        isNearbyOffersLoaded: LoadingStatus.NotFound,
      };
    default:
      return state;
  }
};
