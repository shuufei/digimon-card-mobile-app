import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { colorList } from '../domains/card';
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
  colors: colorList,
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
    updateCardTypes: (
      state,
      action: PayloadAction<{ cardTypes: CardType[] }>
    ) => {
      return {
        ...state,
        cardTypes: action.payload.cardTypes,
      };
    },
    updateLv: (state, action: PayloadAction<{ lvList: Lv[] }>) => {
      return {
        ...state,
        lvList: action.payload.lvList,
      };
    },
    updateCategories: (
      state,
      action: PayloadAction<{ categories: Category[] }>
    ) => {
      return {
        ...state,
        categories: action.payload.categories,
      };
    },
    updateIncludesParallel: (
      state,
      action: PayloadAction<{ includesParallel: boolean }>
    ) => {
      return {
        ...state,
        includesParallel: action.payload.includesParallel,
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
