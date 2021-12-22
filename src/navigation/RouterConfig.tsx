import React, { FC } from 'react';
import { ReactLocation, Router, Outlet } from 'react-location';

import { ROOT } from './CONSTANTS';
import { NotFound } from './NotFound';
import { MainPage } from '../pages';

const routes = [
  {
    path: ROOT,
    element: <MainPage />
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
