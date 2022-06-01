import { combineReducers, configureStore } from '@reduxjs/toolkit';
// rootReducer
// const rootReducer = combineReducers({
//   app01p: app01pReducer,
// });
// store
export const store = configureStore({
  reducer: {
    // rootReducer,
  },
});
export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
