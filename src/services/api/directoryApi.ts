import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { setStatuses } from '../../redux/slices/app-slice';

export const directoryAPI = createApi({
  reducerPath: 'directoryAPI',
  baseQuery,
  tagTypes: ['Directory'],
  endpoints: builder => ({
    getStatuses: builder.query({
      query: () => '/directory/statuses',
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setStatuses(data));
        } catch (err) {}
      },
      providesTags: [{ type: 'Directory', id: 'LIST' }]
    }),
    getStatusById: builder.query({
      query: id => `/directory/statuses/${id}`
    })
  })
});

export const { useGetStatusesQuery } = directoryAPI;
