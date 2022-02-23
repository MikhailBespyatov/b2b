import React, { FC } from 'react';
import { I18nextProvider } from 'react-i18next';
import ThemeProvider from 'arui-feather/theme-provider';

import RouterConfig from './navigation/RouterConfig';
import i18n from './i18n';

import './styles/styles.css';

const App: FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme="alfa-on-white">
        <RouterConfig />
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;
