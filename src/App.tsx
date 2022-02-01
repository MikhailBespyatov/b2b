import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import ThemeProvider from 'arui-feather/theme-provider';

import { RouterConfig } from './navigation/RouterConfig';
import store from './redux/store';
import i18n from './i18n';
import { directoryAPI } from './services/api/directoryApi';

import './styles/styles.css';

store.dispatch(directoryAPI.endpoints.getStatuses.initiate(''));

export const App: FC = () => {
  return (
    <>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme="alfa-on-white">
            <RouterConfig />
          </ThemeProvider>
        </I18nextProvider>
      </Provider>
    </>
  );
};
