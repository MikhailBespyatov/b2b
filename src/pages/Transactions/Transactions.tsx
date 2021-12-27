import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'arui-feather/select';

import { Filter, TableExport, OrderList } from './partials';
import './Transactions.css';

export const Transactions: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Select
        size="xl"
        mode="radio"
        width="available"
        options={[]}
        label={t('transactions.header.title')}
        className="bold_700 p-0 transactions__title"
      />
      <Filter />
      <TableExport />
      <OrderList />
    </>
  );
};
