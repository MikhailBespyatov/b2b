import { baseEmptyAPI } from './baseQuery';

export const transactionAPI = baseEmptyAPI.injectEndpoints({
  endpoints: builder => ({
    getTransactions: builder.query({
      query: ({
        orderId,
        dateCreate,
        deliveryDate,
        order_amount,
        ph_number,
        status,
        sort,
        limit,
        page
      }) => ({
        url: '/accounting/applications',
        params: {
          merchantId: 1,
          orderId,
          dateCreate,
          deliveryDate,
          order_amount,
          ph_number,
          status,
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
          url: '/accounting/changeStatus/json',
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
  }),
  overrideExisting: false
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  usePostSendOtpMutation,
  usePostCheckOtpMutation,
  useUpdateTransactionStatusMutation
} = transactionAPI;
