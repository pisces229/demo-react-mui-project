import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Form {
  name: string;
  count: number;
}

const slice = createSlice({
  name: 'app01p01',
  initialState: () => {
    let form: Form = {
      name: '',
      count: 0,
    };
    return {
      command: '',
      form,
    };
  },
  reducers: {
    command: (writableDraft, payloadAction: PayloadAction<string>) => ({
      ...writableDraft,
      command: payloadAction.payload,
    }),
    form: (writableDraft, payloadAction: PayloadAction<Form>) => ({
      ...writableDraft,
      form: payloadAction.payload,
    }),
  },
});
// reducer
export const app01p01Reducer = slice.reducer;
// action
export const { command: actionCommand, form: actionForm } = slice.actions;
