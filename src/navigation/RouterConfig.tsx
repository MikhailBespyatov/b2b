import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, BrowserRouter, useRoutes } from 'react-router-dom';
import { RootStateType } from 'redux/store';
import { selectAppError } from 'redux/slices/app-slice';
import TechnicalWork from 'pages/ErrorPages/TechnicalWork/TechnicalWork';

import {
  ANALYTICS,
  ROOT,
  SETTINGS,
  SETTLEMENTS,
  STATISTICS,
  TRANSACTIONS
} from './CONSTANTS';
import {
  TransactionsPage,
  StatisticsPage,
  AnalyticsPage,
  SettingsPage,
  TransactionPage
} from '../pages';
import configs from '../config/enviroments';
import { Navbar } from '../components';

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: ROOT,
      element: <Navigate to={TRANSACTIONS} />
    },
    {
      path: TRANSACTIONS,
      element: <TransactionsPage />
    },
    {
      path: `${TRANSACTIONS}/:id`,
      element: <TransactionPage />
    },
    {
      path: ANALYTICS,
      element: <AnalyticsPage />
    },
    {
      path: STATISTICS,
      element: <StatisticsPage />
    },
    {
      path: SETTLEMENTS,
      element: <>SETTLEMENTS</>
    },
    {
      path: SETTINGS,
      element: <SettingsPage />
    }
  ]);

  return routes;
};

const RouterConfig: FC = () => {
  const { code: errorCode } = useSelector((state: RootStateType) =>
    selectAppError(state)
  );

  if (errorCode) {
    return <TechnicalWork />;
  }

  return (
    <BrowserRouter basename={configs.PUBLIC_URL}>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default RouterConfig;
