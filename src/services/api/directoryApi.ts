import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

export const directoryAPI = createApi({
  reducerPath: 'directoryAPI',
  baseQuery,
  tagTypes: ['Directory'],
  endpoints: builder => ({
    getStatuses: builder.query({
      query: () => '/directory/statuses',
      providesTags: [{ type: 'Directory', id: 'LIST' }]
    }),
    getStatusById: builder.query({
      query: id => `/directory/statuses/${id}`
    })
  })
});

export const { useGetStatusesQuery } = directoryAPI;
