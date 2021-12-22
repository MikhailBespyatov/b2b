import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TagButton } from 'arui-feather/tag-button';
import { Select } from 'arui-feather/select';
import Input from 'arui-feather/input';
import { FormField } from 'arui-feather/form-field';
import { Button } from '@alfalab/core-components/button';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Space } from '@alfalab/core-components/space';
import { ModalDesktop } from '@alfalab/core-components/modal/desktop';
import { Typography } from '@alfalab/core-components/typography';

import {
  CheckmarkIcon,
  CrossHeavyIcon,
  PencilHeavyIcon
} from '../../components/ui/icons';
import { Filter } from './partials/Filter/Filter';
import { AMOUNT_FEE } from './constants';
import { RootState } from '../../redux/store';
import './Transactions.css';

export const Transactions: FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { data } = useSelector((state: RootState) => state.transaction);

  const handleModalOpen = () => setOpen(prev => !prev);

  return (
    <>
      <Select
        size="xl"
        mode="radio"
        width="available"
        options={[]}
        label={t('transactions.header.title')}
        className="bold_700"
      />
      <Filter />
      <table className="table">
        <thead>
          <tr>
            <td>{t('transactions.table.transactionNumber')}</td>
            <td>{t('transactions.table.orderNumber')}</td>
            <td>{t('transactions.table.date')}</td>
            <td>{t('transactions.table.amount')}</td>
            <td>{t('transactions.table.payment')}</td>
            <td>{t('transactions.table.commission')}</td>
            <td>{t('transactions.table.status')}</td>
            <td>{t('transactions.table.action')}</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => {
            return (
              <tr key={index} className="table-item">
                <td>{item.merchant_order_id}</td>
                <td>{item.merchant_order_id}</td>
                <td>{item.created_at}</td>
                <td>{item.amount}</td>
                <td>
                  {item.amount - Number((item.amount * AMOUNT_FEE).toFixed(2))}
                </td>
                <td>{(item.amount * AMOUNT_FEE).toFixed(2)}</td>
                <td>
                  {item.app_status && (
                    <TagButton
                      size="s"
                      className={`status status-${item.app_status}`}
                    >
                      {t(
                        `transactions.status.type.${item.app_status}`
                      ).toUpperCase()}
                    </TagButton>
                  )}
                </td>
                <td>
                  <Space direction="horizontal" size={8}>
                    <IconButton
                      size="xs"
                      icon={CheckmarkIcon}
                      className="icon-button bg-green"
                      onClick={handleModalOpen}
                    />
                    <IconButton
                      size="xs"
                      icon={PencilHeavyIcon}
                      className="icon-button bg-blue"
                      onClick={handleModalOpen}
                    />
                    <IconButton
                      size="xs"
                      icon={CrossHeavyIcon}
                      className="icon-button bg-red"
                      onClick={handleModalOpen}
                    />
                  </Space>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ModalDesktop open={open} onClose={handleModalOpen} size="m">
        <ModalDesktop.Header size="m" />
        <ModalDesktop.Content>
          <FormField size="l">
            <Typography.Title tag="h1" view="large" weight="bold">
              {t('transactions.modal.confirm.title')}
            </Typography.Title>
          </FormField>
          <FormField size="l">
            <Input
              label={t('transactions.modal.confirm.input')}
              size="m"
              width="available"
            />
          </FormField>
          <Button size="l" view="primary">
            {t('transactions.modal.confirm.button')}
          </Button>
        </ModalDesktop.Content>
      </ModalDesktop>
    </>
  );
};
