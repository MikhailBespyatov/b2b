import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { uuid } from 'utils/uuid';
import { addToast } from 'redux/slices/app-slice';

const baseQueryBase = fetchBaseQuery({
  baseUrl: ''
});

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQueryBase(args, api, extraOptions);
  if (result.error && result.error.status === 500) {
    api.dispatch(
      addToast({
        id: uuid(),
        badge: 'negative',
        text: 'Внутренняя ошибка',
        title: 'Ошибка'
      })
    );
  }

  return result;
};

export const baseEmptyAPI = createApi({
  reducerPath: 'api',
  tagTypes: ['Directory', 'Transactions'],
  baseQuery,
  endpoints: () => ({})
});
