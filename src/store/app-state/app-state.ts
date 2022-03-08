import { Cities } from '../../const';
import { AppState } from '../../types/app-state';
import { createReducer } from '@reduxjs/toolkit';
import { selectCity } from '../actions';

const initialState: AppState = {
  selectedCity: Cities.Paris,
};

export const appState = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.selectedCity = action.payload;
    });
});
