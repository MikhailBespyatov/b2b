import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { UsersPage } from '../../Users';

const Users: FC = () => {
  const { t } = useTranslation();

  return <UsersPage title={t('partner.users.title')} />;
};

export default Users;
