import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import * as reducer from './reducers';
import { transactionAPI } from '../services/api/transactionAPI';
import { directoryAPI } from '../services/api/directoryApi';

const store = configureStore({
  reducer: {
    ...reducer,
    [transactionAPI.reducerPath]: transactionAPI.reducer,
    [directoryAPI.reducerPath]: directoryAPI.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      transactionAPI.middleware,
      directoryAPI.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootStateType = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

export default store;
