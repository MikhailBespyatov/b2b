import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://rancher-test.alfa-bank.kz:30380/accounting'
});
