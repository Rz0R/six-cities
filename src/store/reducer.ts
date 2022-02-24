import { Actions, ActionType } from '../types/actions';
import { State } from '../types/state';
import { AuthorizationStatus, Cities, LoadingStatus, PostCommentStatus } from '../const';

const initialState: State = {
  selectedCity: Cities.Paris,
  offers: [],
  currentOfferData: {
    currentOffer: null,
    isCurrentOfferLoaded: LoadingStatus.Idle,
  },
  nearbyOffersData: {
    nearbyOffers: [],
    isNearbyOffersLoaded: LoadingStatus.Idle,
  },
  commentsData: {
    comments: [],
    isCommentsLoaded: LoadingStatus.Idle,
  },
  postCommentStatus: PostCommentStatus.Idle,
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
          isCurrentOfferLoaded: LoadingStatus.Success,
        },
      };
    case ActionType.RemoveCurrentOfferData:
      return {
        ...state,
        currentOfferData: {
          currentOffer: null,
          isCurrentOfferLoaded: LoadingStatus.Idle,
        },
      };
    case ActionType.SetCurrentOfferDataNotFoundStatus:
      return {
        ...state,
        currentOfferData: {
          currentOffer: null,
          isCurrentOfferLoaded: LoadingStatus.NotFound,
        },
      };
    case ActionType.LoadNearbyOffers:
      return {
        ...state,
        nearbyOffersData: {
          nearbyOffers: action.payload,
          isNearbyOffersLoaded: LoadingStatus.Success,
        },
      };
    case ActionType.RemoveNearbyOffersData:
      return {
        ...state,
        nearbyOffersData: {
          nearbyOffers: [],
          isNearbyOffersLoaded: LoadingStatus.Idle,
        },
      };
    case ActionType.SetNearbyOffersDataNotFound:
      return {
        ...state,
        nearbyOffersData: {
          nearbyOffers: [],
          isNearbyOffersLoaded: LoadingStatus.NotFound,
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
    case ActionType.LoadComments:
      return {
        ...state,
        commentsData: {
          comments: action.payload,
          isCommentsLoaded: LoadingStatus.Success,
        },
      };
    case ActionType.RemoveCommentsData:
      return {
        ...state,
        commentsData: {
          comments: [],
          isCommentsLoaded: LoadingStatus.Idle,
        },
      };
    case ActionType.SetCommentsDataNotFoundStatus:
      return {
        ...state,
        commentsData: {
          comments: [],
          isCommentsLoaded: LoadingStatus.NotFound,
        },
      };
    case ActionType.SetPostCommentStatus:
      return {
        ...state,
        postCommentStatus: action.payload,
      };
    default:
      return state;
  }
};

export { reducer };
