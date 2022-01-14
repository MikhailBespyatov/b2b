import { createSlice } from '@reduxjs/toolkit';
import { IOrder } from '../../models/IOrder';

const initialState = {
  data: [
    {
      id: 92,
      merchant_order_id: 1,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: '2021-12-20T20:33:38.830523Z',
      otp_updated_at: '2022-01-13T09:54:08.498275Z'
    },
    {
      id: 93,
      merchant_order_id: 2,
      amount: 321456,
      app_status: 'delivered',
      phoneNumber: '77472214849',
      created_at: '2021-12-20T22:46:27.86277Z',
      otp_updated_at: '2022-01-13T09:54:08.498275Z'
    },
    {
      id: 94,
      merchant_order_id: 3,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: '2021-12-20T22:49:40.248647Z',
      otp_updated_at: '2022-01-13T09:54:08.498275Z'
    },
    {
      id: 95,
      merchant_order_id: 4,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: '2021-12-20T22:53:05.519874Z',
      otp_updated_at: '2022-01-13T09:54:08.498275Z'
    },
    {
      id: 96,
      merchant_order_id: 5,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: '2021-12-20T22:56:48.174819Z',
      otp_updated_at: '2022-01-13T09:54:08.498275Z'
    },
    {
      id: 97,
      merchant_order_id: 6,
      amount: 321456,
      app_status: 'delivered',
      phoneNumber: '77472214849',
      created_at: '2021-12-20T22:57:39.567726Z',
      otp_updated_at: '2022-01-13T09:54:08.498275Z'
    },
    {
      id: 98,
      merchant_order_id: 7,
      amount: 321456,
      app_status: 'delivered',
      phoneNumber: '77472214849',
      created_at: '2021-12-20T22:57:53.190159Z',
      otp_updated_at: '2022-01-13T09:54:08.498275Z'
    },
    {
      id: 99,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: '2021-12-22T00:00:00.001606Z',
      otp_updated_at: '2022-01-13T09:54:08.498275Z'
    },
    {
      id: 122,
      merchant_order_id: 127824,
      amount: 321456,
      app_status: 'delivered',
      phoneNumber: '77472214849',
      created_at: '2022-01-12T13:13:55.008516Z',
      otp_updated_at: '2022-01-13T09:54:08.498275Z'
    },
    {
      id: 115,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: '2022-01-07T00:00:00.000233Z',
      otp_updated_at: '2022-01-13T09:54:08.498275Z'
    },
    {
      id: 124,
      merchant_order_id: 127824,
      amount: 321456,
      app_status: 'new',
      phoneNumber: '77472214849',
      created_at: '2022-01-12T23:39:54.13484Z',
      otp_updated_at: '2022-01-13T09:54:08.498275Z'
    }
  ] as IOrder[]
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
