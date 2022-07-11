import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@alfalab/core-components/typography';

const Login: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography.Title view="large" tag="h1">
        {t('login.title')}
      </Typography.Title>
    </div>
  );
};

export default Login;
