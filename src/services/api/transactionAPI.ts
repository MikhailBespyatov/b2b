import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

export const transactionAPI = createApi({
  reducerPath: 'transactionAPI',
  baseQuery,
  tagTypes: ['Transactions'],
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
      }),
      providesTags: [{ type: 'Transactions', id: 'LIST' }]
    }),
    getTransactionById: builder.query({
      query: id => `/accounting/application/${id}`,
      providesTags: (result, error, arg) => [{ type: 'Transactions', id: arg }]
    }),
    updateTransactionStatus: builder.mutation({
      query: ({ body }) => {
        return {
          url: '/changeStatus/json',
          method: 'PUT',
          body
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Transactions', id: arg.id }
      ]
    }),
    postSendOtp: builder.mutation({
      query: ({ body }) => {
        return {
          url: '/accounting/sendOtp',
          method: 'POST',
          body
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Transactions', id: arg.id }
      ]
    }),
    postCheckOtp: builder.mutation({
      query: ({ body }) => {
        return {
          url: '/accounting/checkOtp',
          method: 'POST',
          body
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Transactions', id: arg.id }
      ]
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
