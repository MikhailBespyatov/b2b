import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { FormField } from 'arui-feather/form-field';
import { Select } from 'arui-feather/select';
import MoneyInput from 'arui-feather/money-input';
import Label from 'arui-feather/label';
import Button from 'arui-feather/button';
import Spin from 'arui-feather/spin';
import { Typography } from '@alfalab/core-components/typography';
import { Space } from '@alfalab/core-components/space';
import { useUpdateTransactionStatusMutation } from 'services/api/transactionAPI';
import { ORDER_STATUS } from 'config/constants/status.constants';
import { RootStateType } from 'redux/store';
import { selectMerchant } from 'redux/slices/app-slice';
import { StatusMessage } from '../index';

type PropTypes = {
  id: number;
  merchantOrderId: number;
  orderStatus: string;
  amount: number;
  title: string;
  handleClose: () => void;
};

const OrderCancel: FC<PropTypes> = ({
  id,
  merchantOrderId,
  orderStatus,
  amount,
  title,
  handleClose
}) => {
  const { t } = useTranslation();
  const merchantId = useSelector((state: RootStateType) =>
    selectMerchant(state)
  );
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      reason: '',
      amount: ''
    }
  });

  const [options] = useState([
    {
      text: t('transactions.modal.select.cancel.byTheClient'),
      value: 'value1'
    },
    { text: t('transactions.modal.select.cancel.refused'), value: 'value2' },
    {
      text: t('transactions.modal.select.cancel.notDelivery'),
      value: 'value3'
    },
    {
      text: t('transactions.modal.select.cancel.outOfStock'),
      value: 'value4'
    }
  ]);

  const [updateStatus, { isSuccess, isError, isLoading, error }] =
    useUpdateTransactionStatusMutation();
  const [compensationType, setCompensationType] = useState('fullReturn');

  const onSubmit = (values: any) => {
    updateStatus({
      id,
      body: [
        {
          merchantId,
          orders: [
            {
              amount:
                compensationType === 'fullReturn' ? amount : values.amount,
              orderId: merchantOrderId,
              status: ORDER_STATUS.CANCELED
            }
          ]
        }
      ]
    });
  };

  const handleTypeChange = (type: 'fullReturn' | 'partialReturn') => {
    if (compensationType !== type) {
      setCompensationType(type);
    }
  };

  if (isSuccess) {
    return (
      <StatusMessage
        status="success"
        title={t('transactions.modal.success.canceled', {
          orderNumber: merchantOrderId
        })}
      />
    );
  }

  if (isError && error && 'data' in error) {
    return <StatusMessage status="error" title={error?.data?.message} />;
  }

  return (
    <>
      <Typography.Title
        tag="h4"
        view="small"
        weight="bold"
        className="modal-responsive--title"
      >
        {title} №{merchantOrderId}
      </Typography.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField size="l">
          <p className="modal__subtitle">
            {t('transactions.modal.subtitle.cancel')}
          </p>
        </FormField>
        <FormField size="l">
          <Controller
            name="reason"
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange } }) => (
              <Select
                size="m"
                mode="radio-check"
                width="available"
                className="select_theme_alfa-on-white select-button"
                options={options}
                onChange={onChange}
                error={!!errors.reason}
              />
            )}
          />
        </FormField>
        {![ORDER_STATUS.READY_DELIVERY, ORDER_STATUS.COMPLETED].includes(
          orderStatus
        ) && (
          <>
            <Label>{t('transactions.modal.subtitle.compensationType')}</Label>
            <FormField size="l" className="mt-16">
              <Space direction="horizontal">
                <Button
                  size="m"
                  className={clsx(
                    'btn-circle',
                    compensationType === 'fullReturn' && 'btn-primary'
                  )}
                  tag="span"
                  onClick={() => handleTypeChange('fullReturn')}
                >
                  {t('transactions.modal.button.fullReturn')}
                </Button>
                <Button
                  size="m"
                  className={clsx(
                    'btn-circle',
                    compensationType === 'partialReturn' && 'btn-primary'
                  )}
                  tag="span"
                  onClick={() => handleTypeChange('partialReturn')}
                >
                  {t('transactions.modal.button.partialReturn')}
                </Button>
              </Space>
            </FormField>
            {compensationType === 'partialReturn' && (
              <FormField size="l">
                <Controller
                  name="amount"
                  control={control}
                  rules={{
                    validate: {
                      notZero: value => Number(value) !== 0,
                      notEqualToAmount: value =>
                        Number(value.toString().replace(/\s/g, '')) !==
                          amount ||
                        `${t(
                          'transactions.modal.error.compensationEqualToAmount'
                        )}`,
                      lessThanAmount: value =>
                        Number(value.toString().replace(/\s/g, '')) < amount ||
                        `${t('transactions.modal.error.exceedAmount')}`
                    }
                  }}
                  render={({ field: { value, onChange } }) => (
                    <MoneyInput
                      showCurrency
                      currencyCode="KZT"
                      bold
                      size="m"
                      width="available"
                      label={t('transactions.modal.input.compensationAmount')}
                      value={value.toString().replace(/\s/g, '')}
                      placeholder="0"
                      onChange={inputValue => onChange(inputValue)}
                      hint={errors?.amount?.message}
                      error={!!errors?.amount?.type}
                    />
                  )}
                />
              </FormField>
            )}
          </>
        )}
        <Space direction="horizontal" className="mt-16">
          <Button
            size="m"
            type="submit"
            view="extra"
            leftAddons={<Spin visible={isLoading} />}
          >
            {t('button.confirm')}
          </Button>
          <Button size="m" onClick={handleClose}>
            {t('button.cancel')}
          </Button>
        </Space>
      </form>
    </>
  );
};

export default OrderCancel;
