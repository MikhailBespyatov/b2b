import React, { FC } from 'react';
import { useMatch } from 'react-location';
import { useTranslation } from 'react-i18next';
import { Typography } from '@alfalab/core-components/typography';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Space } from '@alfalab/core-components/space';

import {
  OrderHistory,
  BuyerInfo,
  OrderComposition,
  ChangesHistory
} from './partials';
import {
  CheckmarkIcon,
  CrossHeavyIcon,
  PencilHeavyIcon
} from '../../components/ui/icons';
import './Transaction.css';

export const Transaction: FC = () => {
  const { params } = useMatch();
  const { t } = useTranslation();

  return (
    <>
      <Space direction="horizontal" size={8}>
        <Typography.Title tag="h2" className="transaction__title">
          {t('transaction.header.title')} №{params.id}
        </Typography.Title>
        <IconButton
          size="xs"
          icon={CheckmarkIcon}
          className="icon-button bg-green"
        />
        <IconButton
          size="xs"
          icon={PencilHeavyIcon}
          className="icon-button bg-blue"
        />
        <IconButton
          size="xs"
          icon={CrossHeavyIcon}
          className="icon-button bg-red"
        />
      </Space>
      <OrderHistory />
      <BuyerInfo />
      <OrderComposition />
      <ChangesHistory />
    </>
  );
};
