import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { addToast, setStatuses } from '../../redux/slices/app-slice';
import { IStatus } from '../../models/IStatus';
import { uuid } from '../../utils/uuid';

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
          const transformDataByText = {} as { [key: string]: string[] };

          data.forEach((status: IStatus) => {
            transformData[status.value] = status.textRu;

            if (transformDataByText[status.textRu]) {
              transformDataByText[status.textRu].push(status.value);
            } else {
              transformDataByText[status.textRu] = [status.value];
            }
          });

          const newUniqueStatusOptions = [] as {
            key: string;
            content: string;
            values: string[];
          }[];

          Object.keys(transformDataByText).forEach((key, index) => {
            newUniqueStatusOptions.push({
              key: index.toString(),
              content: key,
              values: transformDataByText[key]
            });
          });

          dispatch(
            setStatuses({
              list: transformData,
              unique: newUniqueStatusOptions
            })
          );
        } catch (err) {
          dispatch(
            addToast({
              id: uuid(),
              badge: 'negative',
              text: 'Ошибка во время загрузки статусов',
              title: ''
            })
          );
        }
      },
      providesTags: [{ type: 'Directory', id: 'LIST' }]
    }),
    getStatusById: builder.query({
      query: id => `/directory/statuses/${id}`
    })
  })
});

export const { useGetStatusesQuery } = directoryAPI;
