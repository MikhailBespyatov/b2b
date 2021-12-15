import React from 'react';
import { Link } from 'react-location';
import { useTranslation } from 'react-i18next';

import { TRANSACTIONS } from './CONSTANTS';
import { useGetTransactionsQuery } from '../services/api/transaction';

export const NotFound = () => {
  const { t } = useTranslation();
  const { data, error, isLoading } = useGetTransactionsQuery('bulbasaur');
  console.log({ data, error, isLoading });
  return (
    <>
      <Link to={TRANSACTIONS}>{t('app.name')}</Link>
      <p>{t('page.notFound.text')}</p>
    </>
  );
};
