import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const transactionAPI = createApi({
  reducerPath: 'transactionAPI',
  baseQuery,
  endpoints: builder => ({
    getTransactions: builder.query({
      query: ({
        merchant_order_id,
        created_at,
        otp_updated_at,
        app_status,
        order_amount,
        ph_number,
        between,
        sort,
        limit,
        page
      }) => ({
        url: '/accounting/applications',
        params: {
          merchant_order_id,
          created_at,
          otp_updated_at,
          app_status,
          order_amount,
          ph_number,
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
    updateTransactionStatus: builder.mutation({
      query: body => {
        return {
          url: '/changeStatus/json',
          method: 'PUT',
          body
        };
      }
    }),
    postSendOtp: builder.mutation({
      query: ({ merchantOrderId, merchantId }) => {
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
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  usePostSendOtpMutation,
  usePostCheckOtpMutation,
  useUpdateTransactionStatusMutation
} = transactionAPI;
