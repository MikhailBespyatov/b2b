import React, { FC } from 'react';
import { ReactLocation, Router, Outlet, Navigate } from 'react-location';

import configs from 'config/enviroments';
import {
  ANALYTICS,
  ROOT,
  SETTLEMENTS,
  STATISTICS,
  TRANSACTIONS
} from './CONSTANTS';
import {
  TransactionPage,
  TransactionsPage,
  StatisticsPage,
  AnalyticsPage
} from '../pages';
import { Navbar, Notification } from '../components';

const routes = [
  {
    path: ROOT,
    element: <Navigate to={TRANSACTIONS} />
  },
  {
    path: TRANSACTIONS,
    children: [
      {
        path: '/',
        element: <TransactionsPage />
      },
      {
        path: `:id`,
        element: <TransactionPage />
      }
    ]
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
  }
];

const reactLocation = new ReactLocation();

const RouterConfig: FC = () => {
  return (
    <Router
      basepath={configs.PUBLIC_URL}
      location={reactLocation}
      routes={routes}
    >
      <Notification />
      <Navbar />
      <Outlet />
    </Router>
  );
};

export default RouterConfig;
