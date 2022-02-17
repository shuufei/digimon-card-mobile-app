import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { DeckScreenTab } from '../configs/deck-screen-tabs';
import { Deck } from '../domains/deck';
import { CardInfo } from '../domains/card';

export type State = {
  selectedDeckId?: string;
  isCreateMode: boolean;
  decks: Deck[];
  currentTab?: DeckScreenTab;
};

const initialState: State = {
  isCreateMode: false,
  decks: [],
  currentTab: 'deck',
};

const deckSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<{ state: State }>) => {
      return {
        ...state,
        ...action.payload.state,
      };
    },
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
    setTab: (state, action: PayloadAction<{ tab: DeckScreenTab }>) => {
      return {
        ...state,
        currentTab: action.payload.tab,
      };
    },
    addCardToDeck: (state, action: PayloadAction<{ card: CardInfo }>) => {
      return {
        ...state,
        decks: state.decks.map((deck) => {
          if (deck.id !== state.selectedDeckId) {
            return deck;
          }
          return {
            ...deck,
            cards: [...deck.cards, action.payload.card],
          };
        }),
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
const currentTabSelector = createSelector(
  selectSelf,
  (state) => state.currentTab
);
export const selectors = {
  selectSelf,
  selectedDeckIdSelector,
  isCreateModeSelector,
  decksSelector,
  selectedDeckSelector,
  currentTabSelector,
};
