import { createSlice } from '@reduxjs/toolkit';
import { IOrder } from '../../models/IOrder';

const initialState = {
  data: [] as IOrder[]
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
