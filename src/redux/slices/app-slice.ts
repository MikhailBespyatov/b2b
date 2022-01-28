import { createSlice } from '@reduxjs/toolkit';
import { INotification } from '../../models/INotification';

const initialState = {
  notifications: [] as INotification[]
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
        (n: any) => n.id !== action.payload
      );
    },
    resetToast: state => {
      state.notifications = [];
    }
  },
  extraReducers: {}
});

export const { resetState, addToast, removeToast, resetToast } =
  appSlice.actions;

export default appSlice.reducer;
