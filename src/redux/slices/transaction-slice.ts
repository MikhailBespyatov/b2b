import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [
    {
      id: 69,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: '',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: null
    },
    {
      id: 10,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 11,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 16,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 15,
      merchant_order_id: 123,
      amount: 789,
      app_status: 'delivered',
      phoneNumber: '71234567890',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 17,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 18,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 19,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 20,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 70,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: '',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: null
    },
    {
      id: 71,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: '',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: null
    },
    {
      id: 72,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: '',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: null
    },
    {
      id: 73,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: '',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: null
    },
    {
      id: 74,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: '',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: null
    },
    {
      id: 22,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 23,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 24,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 25,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 26,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 27,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 28,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 29,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 30,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 31,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 32,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 33,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 34,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 35,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 36,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 37,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 13,
      merchant_order_id: 123,
      amount: 789,
      app_status: 'delivered',
      phoneNumber: '71234567890',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 62,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 38,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 39,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 40,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 41,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 42,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 43,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 21,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 12,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 63,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 64,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 44,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 45,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 46,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 47,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 48,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 49,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 50,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 68,
      merchant_order_id: 127824,
      amount: 321456,
      app_status: '',
      phoneNumber: '77472214849',
      created_at: null,
      otp_updated_at: null
    },
    {
      id: 51,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 65,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 52,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 53,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 54,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 55,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 56,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 57,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 14,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 60,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 58,
      merchant_order_id: 123123,
      amount: 370000,
      app_status: 'delivered',
      phoneNumber: '77172505059',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 59,
      merchant_order_id: 777777,
      amount: 500000,
      app_status: 'delivered',
      phoneNumber: '77017733629',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 61,
      merchant_order_id: 127824,
      amount: 321456,
      app_status: 'delivered',
      phoneNumber: '77472214849',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 66,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 67,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'delivered',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: '2021-12-16T11:02:37.826473Z'
    },
    {
      id: 81,
      merchant_order_id: 11234,
      amount: 10000,
      app_status: 'readyDelivery',
      phoneNumber: '77711271496',
      created_at: null,
      otp_updated_at: null
    }
  ]
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
