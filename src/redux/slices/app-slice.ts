import { createSelector, createSlice, Reducer } from '@reduxjs/toolkit';
import { IError } from 'models/IError';
import { INotification } from 'models/INotification';
import { IStatusOption } from 'models/IStatus';
import type { RootStateType } from '../store';
import { partnerAPI } from '../../services/api/partnerApi';
import { IPartner } from '../../models/IPartner';

const initialState = {
  notifications: [] as INotification[],
  error: {} as IError,
  statuses: {
    list: {} as Record<string, string>,
    unique: [] as IStatusOption[]
  },
  merchant: {
    billingNumber: '',
    bin: '',
    partnerCode: '1',
    partnerEmail: '',
    partnerLegalName: '',
    partnerPoints: [],
    partnerWebsite: '',
    transitBill: ''
  } as IPartner
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
  state => state.merchant
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
    resetMerchant: state => {
      state.merchant = {
        billingNumber: '',
        bin: '',
        partnerCode: '1',
        partnerEmail: '',
        partnerLegalName: '',
        partnerPoints: [],
        partnerWebsite: '',
        transitBill: ''
      };
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      partnerAPI.endpoints.getPartner.matchFulfilled,
      (state, { payload }) => {
        state.merchant = payload;
      }
    );
  }
});

export const {
  resetState,
  addToast,
  removeToast,
  resetToast,
  setStatuses,
  resetMerchant
} = appSlice.actions;

export default appSlice.reducer as Reducer<InitialStateType>;
