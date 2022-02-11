import React, { FC } from 'react';
import { ReactLocation, Router, Outlet, Navigate } from 'react-location';
import { Container } from 'react-grid-system';

import {
  ANALYTICS,
  ROOT,
  SETTLEMENTS,
  STATISTICS,
  TRANSACTIONS
} from './CONSTANTS';
import { Transaction, Transactions, Statistics, Analytics } from '../pages';
import { Navbar, Notification } from '../components';
import configs from './../config/enviroments';

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
    <Router
      basepath={configs.PUBLIC_URL}
      location={reactLocation}
      routes={routes}
    >
      <Notification />
      <Navbar />
      <Container fluid={true}>
        <Outlet />
      </Container>
    </Router>
  );
};
