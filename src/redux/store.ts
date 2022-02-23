import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { baseEmptyAPI } from '../services/api/baseQuery';
import rootReducer from './reducers';

const store = configureStore({
  reducer: {
    ...rootReducer,
    [baseEmptyAPI.reducerPath]: baseEmptyAPI.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseEmptyAPI.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootStateType = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
export default store;
