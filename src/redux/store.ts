import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import * as reducer from './reducers';
import { transactionAPI } from '../services/api/transactionAPI';

const store = configureStore({
  reducer: {
    ...reducer,
    [transactionAPI.reducerPath]: transactionAPI.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(transactionAPI.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

export default store;
