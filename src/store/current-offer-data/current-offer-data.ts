import { CurrentOfferData } from '../../types/current-offer-data';
import { LoadingStatus } from '../../const';
import { createReducer } from '@reduxjs/toolkit';
import {
  loadOfferById,
  removeCurrentOfferData,
  setCurrentOfferDataNotFoundStatus,
} from '../actions';

const initialState: CurrentOfferData = {
  currentOffer: null,
  isCurrentOfferLoaded: LoadingStatus.Idle,
};

export const currentOfferData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOfferById, (state, action) => {
      state.currentOffer = action.payload;
      state.isCurrentOfferLoaded = LoadingStatus.Success;
    })
    .addCase(removeCurrentOfferData, (state) => {
      state.currentOffer = null;
      state.isCurrentOfferLoaded = LoadingStatus.Idle;
    })
    .addCase(setCurrentOfferDataNotFoundStatus, (state) => {
      state.currentOffer = null;
      state.isCurrentOfferLoaded = LoadingStatus.NotFound;
    });
});
