import { createSelector, createSlice, Reducer } from '@reduxjs/toolkit';
import { RootStateType } from 'redux/store';
import { ibkAPI } from 'services/api/ibkApi';

type CompanyType = {
  id: number;
  eqId: string;
  elboId: string;
  name: string;
  iin: string;
  kpp: string;
};

const initialState = {
  token: '',
  company: [] as CompanyType[]
};

type InitialStateType = typeof initialState;

const selectAuth = (state: RootStateType) => state.auth;

export const selectCompany = createSelector(selectAuth, state => state.company);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: () => initialState,
    setToken: (state, { payload }) => {
      state.token = payload;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      ibkAPI.endpoints.getOrganizations.matchFulfilled,
      (state, { payload }) => {
        state.company = payload.company;
      }
    );
  }
});

export const { resetState, setToken } = authSlice.actions;

export default authSlice.reducer as Reducer<InitialStateType>;
