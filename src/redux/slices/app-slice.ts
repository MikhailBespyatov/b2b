import { createSelector, createSlice } from '@reduxjs/toolkit';
import { INotification } from '../../models/INotification';
import { IStatusOption } from '../../models/IStatus';
import { RootStateType } from '../store';

const initialState = {
  notifications: [] as INotification[],
  statuses: {
    list: {} as Record<string, string>,
    unique: [] as IStatusOption[]
  }
};

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

export const appSlice = createSlice({
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
    }
  },
  extraReducers: {}
});

export const { resetState, addToast, removeToast, resetToast, setStatuses } =
  appSlice.actions;

export default appSlice.reducer;
