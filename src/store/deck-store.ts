import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

export type State = {
  selectedDeckId?: string;
  isCreateMode: boolean;
};

const initialState: State = {
  isCreateMode: false,
};

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
    setCreateMode: (
      state,
      action: PayloadAction<{ isCreateMode: State['isCreateMode'] }>
    ) => {
      return {
        ...state,
        isCreateMode: action.payload.isCreateMode,
      };
    },
  },
});

export const actions = deckSlice.actions;

export const reducers = deckSlice.reducer;

export const name = deckSlice.name;

const selectSelf = (state: { [name]: State }) => state[name];
const selectedDeckIdSelector = createSelector(
  selectSelf,
  (state) => state.selectedDeckId
);
const isCreateModeSelector = createSelector(
  selectSelf,
  (state) => state.isCreateMode
);
export const selectors = {
  selectSelf,
  selectedDeckIdSelector,
  isCreateModeSelector,
};
