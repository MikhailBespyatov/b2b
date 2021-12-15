import React, { FC } from 'react';
import { ReactLocation, Router, Outlet } from 'react-location';

import { TRANSACTIONS } from './CONSTANTS';
import { NotFound } from './NotFound';
import { Transactions } from '../pages';

const routes = [
  {
    path: TRANSACTIONS,
    element: <Transactions />
  },
  {
    element: <NotFound />
  }
];

const reactLocation = new ReactLocation();

export const RouterConfig: FC = () => {
  return (
    <Router location={reactLocation} routes={routes}>
      <Outlet />
    </Router>
  );
};
