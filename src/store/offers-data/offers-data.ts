import { createReducer } from '@reduxjs/toolkit';
import { OffersData } from '../../types/offer';
import { replaceOffer } from '../../utils/common';
import { loadOffers, updateOffer, startOffersLoading, failOffersLoading } from '../actions';

const initialState: OffersData = {
  offers: [],
  isOffersDataLoaded: false,
  hasOffersLoadingError: false,
};

export const offersData = createReducer(initialState, (builder) => {
  builder
    .addCase(startOffersLoading, (state) => {
      state.isOffersDataLoaded = false;
      state.hasOffersLoadingError = false;
    })
    .addCase(failOffersLoading, (state) => {
      state.hasOffersLoadingError = true;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isOffersDataLoaded = true;
      state.hasOffersLoadingError = false;
    })
    .addCase(updateOffer, (state, action) => {
      state.offers = replaceOffer(state.offers, action.payload);
    });
});
