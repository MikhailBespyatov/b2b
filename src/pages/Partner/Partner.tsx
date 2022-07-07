import React, { FC, useMemo, useState } from 'react';
import TabItem from 'arui-feather/tab-item';
import Tabs from 'arui-feather/tabs';
import { useTranslation } from 'react-i18next';
import Information from './partials/Information';
import Users from './partials/Users';

type PropsType = {
  merchantId: string;
};

const Partner: FC<PropsType> = ({ merchantId }) => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState<string>('INFORMATION');

  const handleClick = (tab: string) => () => {
    setCurrentTab(tab);
  };

  const tabContentMemo = useMemo(() => {
    switch (currentTab) {
      case 'INFORMATION':
        return <Information merchantId={merchantId} />;
      case 'USERS':
        return <Users merchantId={merchantId} />;
      default:
        return <Information merchantId={merchantId} />;
    }
  }, [currentTab, merchantId]);

  return (
    <>
      <Tabs className="navbar">
        <TabItem
          className="c-pointer"
          onClick={handleClick('INFORMATION')}
          checked={currentTab === 'INFORMATION'}
        >
          {t('partner.nav.information')}
        </TabItem>
        <TabItem
          className="c-pointer"
          onClick={handleClick('USERS')}
          checked={currentTab === 'USERS'}
        >
          {t('partner.nav.users')}
        </TabItem>
      </Tabs>
      {tabContentMemo}
    </>
  );
};

export default Partner;
