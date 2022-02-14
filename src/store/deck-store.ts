import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

export type State = {
  selectedDeckId?: string;
};

const initialState: State = {};

const deckSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    selectDeck: (
      state,
      action: PayloadAction<{ deckId: State['selectedDeckId'] }>
    ) => {
      return { ...state, selectedDeckId: action.payload.deckId };
    },
  },
});

export const actions = deckSlice.actions;

export const reducers = deckSlice.reducer;

export const name = deckSlice.name;

const selectSelf = (state: { [name]: State }) => state[name];
const selectedDeckId = createSelector(
  selectSelf,
  (state) => state.selectedDeckId
);
export const selectors = {
  selectSelf,
  selectedDeckId,
};
