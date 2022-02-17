import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Deck } from '../domains/deck';

export type State = {
  selectedDeckId?: string;
  isCreateMode: boolean;
  decks: Deck[];
};

const initialState: State = {
  isCreateMode: false,
  decks: [],
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
    addDeck: (state, action: PayloadAction<{ deck: Deck }>) => {
      return {
        ...state,
        decks: [...state.decks, action.payload.deck],
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
const decksSelector = createSelector(selectSelf, (state) => state.decks);
const selectedDeckSelector = createSelector(selectSelf, (state) => {
  return state.decks.find((deck) => deck.id === state.selectedDeckId);
});
export const selectors = {
  selectSelf,
  selectedDeckIdSelector,
  isCreateModeSelector,
  decksSelector,
  selectedDeckSelector,
};
