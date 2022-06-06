import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'commonProgressReducer',
  initialState: {
    display: false,
    message: 'Progress',
  },
  reducers: {
    open: (state) => ({ ...state, display: true }),
    close: (state) => ({ ...state, display: false }),
  },
});
// action
export const { open: commonProgressOpen, close: commonProgressClose } =
  slice.actions;
// reducer
export const commonProgressReducer = slice.reducer;
