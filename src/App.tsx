import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import { RouterConfig } from './navigation/RouterConfig';
import store from './redux/store';
import i18n from './i18n';

import './App.css';

export const App: FC = () => {
  return (
    <>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <RouterConfig />
        </I18nextProvider>
      </Provider>
    </>
  );
};
