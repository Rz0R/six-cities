import { NearbyOffersData } from '../../types/nearby-offers-data';
import { LoadingStatus } from '../../const';
import { replaceOffer } from '../../utils/common';
import { createReducer } from '@reduxjs/toolkit';
import { loadNearbyOffers, updateNearbyOffers, removeNearbyOffersData, setNearbyOffersDataNotFound } from '../actions';

const initialState: NearbyOffersData = {
  nearbyOffers: [],
  isNearbyOffersLoaded: LoadingStatus.Idle,
};

export const nearbyOffersData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
      state.isNearbyOffersLoaded = LoadingStatus.Success;
    })
    .addCase(updateNearbyOffers, (state, action) => {
      state.nearbyOffers = replaceOffer(state.nearbyOffers, action.payload);
    })
    .addCase(removeNearbyOffersData, (state) => {
      state.nearbyOffers = [];
      state.isNearbyOffersLoaded = LoadingStatus.Idle;
    })
    .addCase(setNearbyOffersDataNotFound, (state) => {
      state.nearbyOffers = [];
      state.isNearbyOffersLoaded = LoadingStatus.NotFound;
    });
});
