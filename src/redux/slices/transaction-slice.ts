import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    resetState: () => initialState
  },
  extraReducers: {}
});

export const { resetState } = transactionSlice.actions;

export default transactionSlice.reducer;
