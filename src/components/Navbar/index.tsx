import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Tabs from 'arui-feather/tabs';
import TabItem from 'arui-feather/tab-item';

import { Transactions } from '../../pages';
import { TabsType } from './model';

export const Navbar: FC = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState('tab_2');

  const tabs: TabsType = useMemo(() => {
    return {
      tab_1: {
        title: 'page.nav.tab_1',
        render: null
      },
      tab_2: {
        title: 'page.nav.tab_2',
        render: <Transactions />
      },
      tab_3: {
        title: 'page.nav.tab_3',
        render: null
      },
      tab_4: {
        title: 'page.nav.tab_4',
        render: null
      }
    };
  }, []);

  const handleClick = (event: any) => {
    event.preventDefault();
    setCurrentTab(event.target.getAttribute('href'));
  };

  return (
    <>
      <Tabs className="tabs">
        {Object.keys(tabs).map(key => {
          return (
            <TabItem
              key={key}
              url={key}
              onClick={handleClick}
              checked={currentTab === key}
            >
              {t(`page.nav.${key}`)}
            </TabItem>
          );
        })}
      </Tabs>
      {currentTab && tabs[currentTab].render}
    </>
  );
};
