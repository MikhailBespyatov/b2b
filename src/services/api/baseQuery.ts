import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import configs from './../../config/enviroments';

export const baseQuery = fetchBaseQuery({
  baseUrl: configs.SERVER
});
