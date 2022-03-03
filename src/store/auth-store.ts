import { createSlice, createSelector } from '@reduxjs/toolkit';
export type State = {
  isAuthenticated?: boolean;
};

const initialState: State = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state) => {
      return {
        ...state,
        isAuthenticated: true,
      };
    },
    signOut: (state) => {
      return {
        ...state,
        isAuthenticated: false,
      };
    },
  },
});

export const actions = authSlice.actions;

export const reducers = authSlice.reducer;

export const name = authSlice.name;

const selectSelf = (state: { [name]: State }) => state[name];
const isAuthenticatedSelector = createSelector(
  selectSelf,
  (state) => state.isAuthenticated
);
export const selectors = {
  selectSelf,
  isAuthenticatedSelector,
};
