import { configureStore } from '@reduxjs/toolkit';

import * as reducer from './reducers';
import { transactionAPI } from '../services/api/transaction';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    ...reducer,
    [transactionAPI.reducerPath]: transactionAPI.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(transactionAPI.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

setupListeners(store.dispatch);

export default store;
