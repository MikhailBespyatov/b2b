import { uuid } from 'utils/uuid';
import { addToast, setStatuses } from 'redux/slices/app-slice';
import { IStatus, IStatusOption } from 'models/IStatus';
import { baseEmptyAPI } from './baseQuery';

export const directoryAPI = baseEmptyAPI.injectEndpoints({
  endpoints: builder => ({
    getStatuses: builder.query({
      query: () => '/directory/statuses',
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const transformData = {} as Record<string, string>;
          const transformDataByText = {} as Record<string, string[]>;

          data.forEach((status: IStatus) => {
            transformData[status.value] = status.textRu;

            if (transformDataByText[status.textRu]) {
              transformDataByText[status.textRu].push(status.value);
            } else {
              transformDataByText[status.textRu] = [status.value];
            }
          });

          const newUniqueStatusOptions = [] as IStatusOption[];

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
  }),
  overrideExisting: false
});

export const { useGetStatusesQuery } = directoryAPI;
