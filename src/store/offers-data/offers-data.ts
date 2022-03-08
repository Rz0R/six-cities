import { OffersData } from '../../types/offer';
import { replaceOffer } from '../../utils/common';
import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, updateOffer } from '../actions';

const initialState: OffersData = {
  offers: [],
  isOffersDataLoaded: false,
};

export const offersData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isOffersDataLoaded = true;
    })
    .addCase(updateOffer, (state, action) => {
      state.offers = replaceOffer(state.offers, action.payload);
    });
});
