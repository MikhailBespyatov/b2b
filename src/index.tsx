import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Dispatch } from 'redux';
import Cookies from 'js-cookie';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import { setToken } from './redux/slices/app-slice';
import { directoryAPI } from './services/api/directoryApi';

const initApp = () => async (dispatch: Dispatch<any>) => {
  const token = Cookies.get('profileId') ?? '62aaaba946f54c1f9d4ad232bf71b6e2';
  await dispatch(setToken(token));
  // dispatch(ibkAPI.endpoints.getOrganizations.initiate(''));
  dispatch(directoryAPI.endpoints.getStatuses.initiate(''));
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
