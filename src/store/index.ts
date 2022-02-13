import { configureStore } from '@reduxjs/toolkit';
import * as cardListFilterStore from './card-list-filter-store';

export const store = configureStore({
  reducer: {
    [cardListFilterStore.name]: cardListFilterStore.reducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
