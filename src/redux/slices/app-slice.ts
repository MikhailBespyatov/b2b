import { createSlice } from '@reduxjs/toolkit';
import { INotification } from '../../models/INotification';
import { IStatus } from '../../models/IStatus';

const initialState = {
  notifications: [] as INotification[],
  statuses: [] as IStatus[]
};

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
      state.statuses = payload;
    }
  },
  extraReducers: {}
});

export const { resetState, addToast, removeToast, resetToast, setStatuses } =
  appSlice.actions;

export default appSlice.reducer;
