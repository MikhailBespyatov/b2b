import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Dispatch } from 'redux';
import Cookies from 'js-cookie';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store, { RootStateType } from './redux/store';
import { directoryAPI } from './services/api/directoryApi';
import { ibkAPI } from './services/api/ibkApi';
import { partnerAPI } from './services/api/partnerApi';
import { setToken } from './redux/slices/auth-slice';

const initApp =
  () => async (dispatch: Dispatch<any>, getState: () => RootStateType) => {
    const token =
      Cookies.get('profileId') ?? '62aaaba946f54c1f9d4ad232bf71b6e2';
    await dispatch(setToken(token));
    await Promise.all([
      dispatch(ibkAPI.endpoints.getOrganizations.initiate(token)),
      dispatch(ibkAPI.endpoints.getOrganizationsIBK.initiate(token)),
      dispatch(directoryAPI.endpoints.getStatuses.initiate(''))
    ]);

    const { company } = getState().auth;

    if (company.length) {
      dispatch(partnerAPI.endpoints.getPartner.initiate(company[0].iin));
    }
  };

store.dispatch(initApp());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
