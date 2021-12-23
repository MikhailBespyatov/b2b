import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionAPI = createApi({
  reducerPath: 'transactionAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rancher-test.alfa-bank.kz:30380/accounting'
  }),
  endpoints: builder => ({
    getTransactions: builder.query({
      query: () => '/applications'
    })
  })
});

export const { useGetTransactionsQuery } = transactionAPI;
