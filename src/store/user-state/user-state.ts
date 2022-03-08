import { UserState } from '../../types/user-data';
import { AuthorizationStatus } from '../../const';
import { createReducer } from '@reduxjs/toolkit';
import { requireAuthorization, requireLogout, loadUserData, removeUserData } from '../actions';

const initialState: UserState = {
  userData: null,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userState = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(removeUserData, (state) => {
      state.userData = null;
    });
});
