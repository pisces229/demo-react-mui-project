import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'commonMessageReducer',
  initialState: {
    display: false,
    message: '',
  },
  reducers: {
    open: (state, action: PayloadAction<string>) => ({
      ...state,
      display: true,
      message: action.payload,
    }),
    close: (state) => ({ ...state, display: false, message: '' }),
  },
});
// action
export const { open: commonMessageOpen, close: commonMessageClose } =
  slice.actions;
// reducer
export const commonMessageReducer = slice.reducer;
