import { createSelector, createSlice, Reducer } from '@reduxjs/toolkit';
import { IError } from 'models/IError';
import { INotification } from 'models/INotification';
import { IStatusOption } from 'models/IStatus';
import type { RootStateType } from '../store';

const initialState = {
  notifications: [] as INotification[],
  error: {} as IError,
  statuses: {
    list: {} as Record<string, string>,
    unique: [] as IStatusOption[]
  },
  merchantId: '1'
};
type InitialStateType = typeof initialState;

const selectApp = (state: RootStateType) => state.app;

export const selectStatuses = createSelector(
  selectApp,
  state => state.statuses
);
export const selectNotifications = createSelector(
  selectApp,
  state => state.notifications
);

export const selectStatusesList = createSelector(
  selectStatuses,
  state => state.list
);
export const selectStatusesUnique = createSelector(
  selectStatuses,
  state => state.unique
);

export const selectMerchant = createSelector(
  selectApp,
  state => state.merchantId
);

export const selectAppError = createSelector(selectApp, state => state.error);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    resetState: () => initialState,
    addToast: (state, action: { payload: INotification }) => {
      state.notifications.push(action.payload);
    },
    removeToast: (state, action: { payload: string }) => {
      state.notifications = state.notifications.filter(
        n => n.id !== action.payload
      );
    },
    resetToast: state => {
      state.notifications = [];
    },
    setStatuses: (state, { payload }) => {
      state.statuses.list = payload.list;
      state.statuses.unique = payload.unique;
    },
    setMerchant: (state, { payload }) => {
      state.merchantId = payload.merchantId;
    }
  },
  extraReducers: {}
});

export const {
  resetState,
  addToast,
  removeToast,
  resetToast,
  setStatuses,
  setMerchant
} = appSlice.actions;

export default appSlice.reducer as Reducer<InitialStateType>;
