import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import { RootStateType } from 'redux/store';
import { selectAppError, selectMerchant } from 'redux/slices/app-slice';
import { Grid } from '@alfalab/core-components/grid';
import TechnicalWork from 'pages/ErrorPages/TechnicalWork/TechnicalWork';
import {
  AnalyticsPage,
  LoginPage,
  PartnersPage,
  SettingsPage,
  StatisticsPage,
  TransactionPage,
  TransactionsPage,
  UsersPage
} from '../pages';
import configs from '../config/enviroments';
import {
  ANALYTICS,
  NEW_PARTNER,
  NEW_USER,
  PARTNERS,
  ROOT,
  SETTINGS,
  SETTLEMENTS,
  STATISTICS,
  TRANSACTIONS,
  USER,
  USERS
} from './CONSTANTS';
import { NewPartnerPage } from '../pages/Partners';
import { UserPage } from '../pages/Users/partials/UserPage';
import { NewUser } from '../pages/Users/partials/NewUser';
import { Sidebar } from '../components/ui/Sidebar';
import { Header } from '../components/ui/Header';
import { Navbar } from '../components';

const routes = [
  {
    path: ROOT,
    element: <Navigate to={TRANSACTIONS} />
  },
  {
    path: PARTNERS,
    element: <PartnersPage />
  },
  {
    path: PARTNERS + NEW_PARTNER,
    element: <NewPartnerPage />
  },
  {
    path: USERS,
    element: <UsersPage />
  },
  {
    path: USER,
    element: <UserPage />
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
];

const NavbarWrapper = () => {
  const { pathname } = useLocation();

  if (pathname === ROOT) {
    return <Navbar />;
  }

  return null;
};

const Layout: FC = () => {
  const merchant = useSelector((state: RootStateType) => selectMerchant(state));

  return (
    <Grid.Row gutter={0}>
      <Grid.Col
        width={{
          mobile: { s: 0, m: 0, l: 0 },
          tablet: { s: 0, m: 3, l: 3 },
          desktop: { s: 3, m: 2, l: 2 }
        }}
      >
        <Sidebar />
      </Grid.Col>
      <Grid.Col
        width={{
          mobile: { s: 12, m: 12, l: 12 },
          tablet: { s: 12, m: 9, l: 9 },
          desktop: { s: 9, m: 10, l: 10 }
        }}
      >
        <Header merchant={merchant} />
        <NavbarWrapper />
        <div className="mr-16">
          <Outlet />
        </div>
      </Grid.Col>
    </Grid.Row>
  );
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
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          {routes.map(route => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterConfig;
