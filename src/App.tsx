import React, { FC } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ReactAccederProvider } from 'react-acceder';

import RouterConfig from './navigation/RouterConfig';
import i18n from './i18n';

import './styles/styles.css';

const App: FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ReactAccederProvider permissions={['SHOW_TRANSACTION_TABLE']}>
        <RouterConfig />
      </ReactAccederProvider>
    </I18nextProvider>
  );
};

export default App;
