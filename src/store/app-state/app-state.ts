import { createReducer } from '@reduxjs/toolkit';
import { Cities } from '../../const';
import { AppState } from '../../types/app-state';
import { selectCity } from '../actions';

export const initialState: AppState = {
  selectedCity: Cities.Paris,
};

export const appState = createReducer(initialState, (builder) => {
  builder.addCase(selectCity, (state, action) => {
    state.selectedCity = action.payload;
  });
});
