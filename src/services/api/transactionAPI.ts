import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const transactionAPI = createApi({
  reducerPath: 'transactionAPI',
  baseQuery,
  endpoints: builder => ({
    getStatuses: builder.query({
      query: () => '/accounting/statuses'
    }),
    getStatusById: builder.query({
      query: id => `/accounting/statuses/${id}`
    }),
    getTransactions: builder.query({
      query: ({
        merchantId,
        dateCreate,
        deliveryDate,
        status,
        between,
        sort,
        limit,
        page
      }) => ({
        url: '/accounting/applications',
        params: {
          merchantId,
          dateCreate,
          deliveryDate,
          status,
          between,
          sort,
          lim: limit,
          page
        }
      })
    }),
    getTransactionById: builder.query({
      query: id => `/accounting/application/${id}`
    }),
    postSendOtp: builder.mutation({
      query: ({ merchantOrderId = '121123', merchantId = '1' }) => {
        return {
          url: '/accounting/sendOtp',
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
          url: '/accounting/checkOtp',
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
  useGetStatusesQuery,
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  usePostSendOtpMutation,
  usePostCheckOtpMutation
} = transactionAPI;
