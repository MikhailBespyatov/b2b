import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TRANSACTIONS } from './CONSTANTS';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <Link to={TRANSACTIONS}>{t('app.name')}</Link>
      <p>{t('page.notFound.text')}</p>
    </>
  );
};

export default NotFound;
