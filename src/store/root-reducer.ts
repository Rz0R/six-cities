import { combineReducers } from '@reduxjs/toolkit';
import { appState } from '../store/app-state/app-state';
import { commentsData } from './comments-data/comments-data';
import { nearbyOffersData } from './nearby-offers-data/nearby-offers-data';
import { offersData } from './offers-data/offers-data';
import { userState } from './user-state/user-state';

export enum NameSpace {
  app = 'APP',
  comments = 'COMMENTS',
  nearbyOffers = 'NEARBY_OFFERS',
  offers = 'OFFERS',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.app]: appState,
  [NameSpace.comments]: commentsData,
  [NameSpace.nearbyOffers]: nearbyOffersData,
  [NameSpace.offers]: offersData,
  [NameSpace.user]: userState,
});

export type RootState = ReturnType<typeof rootReducer>;
