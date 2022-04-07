import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { uuid } from 'utils/uuid';
import { addToast } from 'redux/slices/app-slice';
import { RootStateType } from 'redux/store';

interface CustomError {
  data: {
    code: number;
    message: string;
  };
  status: number;
}

const baseQueryBase = fetchBaseQuery({
  baseUrl: '',
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootStateType).app;

    if (token) {
      headers.set('token', token);
    }

    return headers;
  },
  credentials: 'include'
}) as BaseQueryFn<string | FetchArgs, unknown, CustomError>;

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, CustomError> = async (
  args,
  api,
  extraOptions
) => {
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
