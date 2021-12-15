import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cat-fact.herokuapp.com' }),
  endpoints: builder => ({
    getTransactions: builder.query({
      query: () => '/facts'
    })
  })
});

export const { useGetTransactionsQuery } = transactionAPI;
