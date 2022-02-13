import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import {
  Color,
  CardType,
  Lv,
  Category,
  COLOR,
  CARD_TYPE,
  LV,
  CATEGORY,
} from '../domains/card';

type State = {
  colors: Color[];
  cardTypes: CardType[];
  lvList: Lv[];
  categories: Category[];
  includesParallel: boolean;
};

const initialState: State = {
  colors: Object.entries(COLOR)
    .map((v) => v[0] as Color)
    .filter((v) => v !== '8_multicolor'),
  cardTypes: Object.entries(CARD_TYPE).map((v) => v[0] as CardType),
  lvList: Object.entries(LV).map((v) => v[0] as Lv),
  categories: Object.entries(CATEGORY).map((v) => v[0] as Category),
  includesParallel: true,
};

const cardListFilterSlice = createSlice({
  name: 'card-list-filter',
  initialState: initialState,
  reducers: {
    updateColors: (state, action: PayloadAction<{ colors: Color[] }>) => {
      return {
        ...state,
        colors: action.payload.colors,
      };
    },
  },
});

export const actions = cardListFilterSlice.actions;

export const reducers = cardListFilterSlice.reducer;
export const name = cardListFilterSlice.name;

/** Selectors */
const selectSelf = (state: { [name]: State }) => state[name];
const colorsSelector = createSelector(selectSelf, (state) => state.colors);
const cardTypesSelector = createSelector(
  selectSelf,
  (state) => state.cardTypes
);
const lvListSelector = createSelector(selectSelf, (state) => state.lvList);
const categoriesSelector = createSelector(
  selectSelf,
  (state) => state.categories
);
const includesParallelSelector = createSelector(
  selectSelf,
  (state) => state.includesParallel
);

export const selectors = {
  colorsSelector,
  cardTypesSelector,
  lvListSelector,
  categoriesSelector,
  includesParallelSelector,
};
