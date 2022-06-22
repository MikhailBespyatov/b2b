import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import Tabs from 'arui-feather/tabs';
import TabItem from 'arui-feather/tab-item';

import {
  ANALYTICS,
  SETTLEMENTS,
  STATISTICS,
  TRANSACTIONS
} from 'navigation/CONSTANTS';
import { TabsType } from './model';

const Navbar: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const tabs: TabsType = {
    tab_1: {
      title: 'page.nav.tab_1',
      url: STATISTICS
    },
    tab_2: {
      title: 'page.nav.tab_2',
      url: TRANSACTIONS
    },
    tab_3: {
      title: 'page.nav.tab_3',
      url: ANALYTICS
    },
    tab_4: {
      title: 'page.nav.tab_4',
      url: SETTLEMENTS
    }
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    if (event.target.getAttribute('href')) {
      navigate(event.target.getAttribute('href'), { replace: true });
    } else {
      navigate(pathname, { replace: true });
    }
  };

  return (
    <Tabs className="navbar">
      {Object.keys(tabs).map(key => {
        return (
          <TabItem
            key={key}
            url={tabs[key].url}
            onClick={handleClick}
            checked={pathname === tabs[key].url}
            className="c-pointer"
          >
            {t(`page.nav.${key}`)}
          </TabItem>
        );
      })}
    </Tabs>
  );
};

export default Navbar;
