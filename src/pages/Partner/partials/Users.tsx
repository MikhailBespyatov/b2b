import { UsersPage } from 'pages';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

type PropsType = {
  merchantId: string;
};

const Users: FC<PropsType> = ({ merchantId }) => {
  const { t } = useTranslation();

  return <UsersPage title={t('partner.users.title')} merchantId={merchantId} />;
};

export default Users;
