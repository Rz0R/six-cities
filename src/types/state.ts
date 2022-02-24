import { Cities, AuthorizationStatus, LoadingStatus, PostCommentStatus } from '../const';
import { Offers, Offer } from './offer';
import { Comments } from './comments';
import { UserData } from './user-data';

export type State = {
  selectedCity: Cities,
  offers: Offers,
  currentOfferData: {
    currentOffer: Offer | null,
    isCurrentOfferLoaded: LoadingStatus,
  },
  nearbyOffersData: {
    nearbyOffers: Offers,
    isNearbyOffersLoaded: LoadingStatus,
  },
  commentsData: {
    comments: Comments,
    isCommentsLoaded: LoadingStatus,
  },
  postCommentStatus: PostCommentStatus,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  userData: UserData,
};
