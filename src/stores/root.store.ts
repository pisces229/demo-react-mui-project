import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { app01p01Reducer } from './app01/app01-p01/app01-p01.store';
import { app01p02Reducer } from './app01/app01-p02/app01-p02.store';
// rootReducer
// const rootReducer = combineReducers({
//   app01p: app01pReducer,
// });
// store
export const store = configureStore({
  reducer: {
    // rootReducer,
    app01p01: app01p01Reducer,
    app01p02: app01p02Reducer,
  },
});
export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
