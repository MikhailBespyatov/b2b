import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { ReactLocation, Router, Outlet, Navigate } from 'react-location';
import { RootStateType } from 'redux/store';
import { selectAppError } from 'redux/slices/app-slice';
import TechnicalWork from 'pages/ErrorPages/TechnicalWork/TechnicalWork';

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
  const { code: errorCode } = useSelector((state: RootStateType) =>
    selectAppError(state)
  );

  if (errorCode) {
    return <TechnicalWork />;
  }

  return (
    <Router basepath="/b2b" location={reactLocation} routes={routes}>
      <Notification />
      <Navbar />
      <Outlet />
    </Router>
  );
};

export default RouterConfig;
