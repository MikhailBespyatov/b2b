import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@alfalab/core-components/typography';

import { Filter, TableExport, OrderList } from './partials';
import './Transactions.css';

export const Transactions: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography.Title
        tag="h1"
        font="system"
        className="title-1 transaction__title"
      >
        {t('transactions.header.title')}
      </Typography.Title>
      <Filter />
      <TableExport />
      <OrderList />
    </>
  );
};
