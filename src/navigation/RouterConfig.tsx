import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  Navigate,
  BrowserRouter,
  useRoutes,
  useLocation
} from 'react-router-dom';
import { Grid } from '@alfalab/core-components/grid';
import { RootStateType } from 'redux/store';
import { selectAppError, selectMerchant } from 'redux/slices/app-slice';
import TechnicalWork from 'pages/ErrorPages/TechnicalWork/TechnicalWork';
import { NewUser } from 'pages/Users/partials/NewUser';
import {
  NEW_USER,
  ANALYTICS,
  PARTNERS,
  ROOT,
  SETTINGS,
  SETTLEMENTS,
  STATISTICS,
  TRANSACTIONS,
  USERS
} from './CONSTANTS';
import {
  TransactionsPage,
  PartnersPage,
  StatisticsPage,
  AnalyticsPage,
  SettingsPage,
  TransactionPage,
  UsersPage
} from '../pages';
import configs from '../config/enviroments';
import { Navbar } from '../components';
import { Header } from '../components/ui/Header';
import { Sidebar } from '../components/ui/Sidebar';

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: ROOT,
      element: <Navigate to={TRANSACTIONS} />
    },
    {
      path: PARTNERS,
      element: <PartnersPage />
    },
    {
      path: USERS,
      element: <UsersPage />
    },
    {
      path: NEW_USER,
      element: <NewUser />
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

const NavbarWrapper = () => {
  const { pathname } = useLocation();

  if (pathname === ROOT) {
    return <Navbar />;
  }

  return null;
};

const RouterConfig: FC = () => {
  const { code: errorCode } = useSelector((state: RootStateType) =>
    selectAppError(state)
  );
  const merchant = useSelector((state: RootStateType) => selectMerchant(state));

  if (errorCode) {
    return <TechnicalWork />;
  }

  return (
    <BrowserRouter basename={configs.PUBLIC_URL}>
      <Grid.Row gutter={0}>
        <Grid.Col
          width={{
            mobile: { s: 0, m: 0, l: 0 },
            tablet: { s: 0, m: 0, l: 0 },
            desktop: { s: 3, m: 2, l: 2 }
          }}
        >
          <Sidebar />
        </Grid.Col>
        <Grid.Col
          width={{
            mobile: { s: 12, m: 12, l: 12 },
            tablet: { s: 12, m: 12, l: 12 },
            desktop: { s: 9, m: 10, l: 10 }
          }}
        >
          <Header merchant={merchant} />
          <NavbarWrapper />
          <div className="mr-16">
            <AppRoutes />
          </div>
        </Grid.Col>
      </Grid.Row>
    </BrowserRouter>
  );
};

export default RouterConfig;
