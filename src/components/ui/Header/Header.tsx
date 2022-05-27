import React, { FC } from 'react';
import { LogoutMIcon } from '@alfalab/icons-classic/LogoutMIcon';
import { Typography } from '@alfalab/core-components/typography';
import { NotificationsMBlackIcon } from '@alfalab/icons-classic/NotificationsMBlackIcon';
import { Space } from '@alfalab/core-components/space';
import { IPartner } from 'models/IPartner';

import s from './Header.module.css';

type PropTypes = {
  merchant: IPartner;
};

const Header: FC<PropTypes> = ({ merchant }) => {
  return (
    <header className={s.header}>
      <Space direction="horizontal">
        <NotificationsMBlackIcon />
        <Typography.Title
          tag="h6"
          font="system"
          view="xsmall"
          color="secondary"
          weight="regular"
          className={s.title}
        >
          {merchant?.partnerLegalName}
        </Typography.Title>
        <LogoutMIcon className="c-pointer" />
      </Space>
    </header>
  );
};

export default Header;
