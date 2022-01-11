import React, { FC } from 'react';
import { ReactLocation, Router, Outlet, Navigate } from 'react-location';

import {
  ANALYTICS,
  ROOT,
  SETTLEMENTS,
  STATISTICS,
  TRANSACTIONS
} from './CONSTANTS';
import { Transaction, Transactions, Statistics, Analytics } from '../pages';
import { Navbar } from '../components';

const routes = [
  {
    path: ROOT,
    element: <Navigate to={ANALYTICS} />
  },
  {
    path: TRANSACTIONS,
    children: [
      {
        path: ROOT,
        element: <Transactions />
      },
      {
        path: `:id`,
        element: <Transaction />
      }
    ]
  },
  {
    path: ANALYTICS,
    element: <Analytics />
  },
  {
    path: STATISTICS,
    element: <Statistics />
  },
  {
    path: SETTLEMENTS,
    element: <>SETTLEMENTS</>
  }
];

const reactLocation = new ReactLocation();

export const RouterConfig: FC = () => {
  return (
    <Router location={reactLocation} routes={routes}>
      <Navbar />
      <Outlet />
    </Router>
  );
};
