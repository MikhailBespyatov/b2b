import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { setStatuses } from '../../redux/slices/app-slice';
import { IStatus } from '../../models/IStatus';

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
          const transformData = {} as { [key: string]: string };
          data.forEach((status: IStatus) => {
            transformData[status.value] = status.textRu;
          });
          dispatch(setStatuses(transformData));
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
