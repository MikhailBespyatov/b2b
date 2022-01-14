import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const transactionAPI = createApi({
  reducerPath: 'transactionAPI',
  baseQuery,
  endpoints: builder => ({
    getTransactions: builder.query({
      query: ({ from, to }) => ({
        url: '/applications',
        params: { from, to }
      })
    }),
    getTransactionById: builder.query({
      query: id => ({
        url: '/applications',
        params: { id }
      })
    }),
    postSendOtp: builder.mutation({
      query: ({ merchantOrderId, merchantId }) => {
        return {
          url: '/sendOtp',
          method: 'POST',
          body: {
            merchantOrderId: merchantOrderId,
            merchantId: merchantId
          }
        };
      }
    }),
    postCheckOtp: builder.mutation({
      query: ({ merchantOrderId, merchantId, otpCode }) => {
        return {
          url: '/checkOtp',
          method: 'POST',
          body: {
            merchantOrderId: merchantOrderId,
            merchantId: merchantId,
            otp: otpCode
          }
        };
      }
    })
  })
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  usePostSendOtpMutation,
  usePostCheckOtpMutation
} = transactionAPI;
