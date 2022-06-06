import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { commonProgressReducer } from './common-progress.store';
import { commonMessageReducer } from './common-message.store';

// rootReducer
// const rootReducer = combineReducers({
//   app01p: app01pReducer,
// });
// store
export const store = configureStore({
  reducer: {
    commonProgressReducer,
    commonMessageReducer,
  },
});
export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
