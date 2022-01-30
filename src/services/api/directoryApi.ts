import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const directoryAPI = createApi({
  reducerPath: 'statusAPI',
  baseQuery,
  endpoints: builder => ({
    getStatuses: builder.query({
      query: () => '/directory/statuses'
    }),
    getStatusById: builder.query({
      query: id => `/directory/statuses/${id}`
    })
  })
});

export const { useGetStatusesQuery } = directoryAPI;
