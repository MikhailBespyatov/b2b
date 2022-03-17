import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { FormField } from 'arui-feather/form-field';
import Button from 'arui-feather/button';
import { Select } from 'arui-feather/select';
import { Typography } from '@alfalab/core-components/typography';
import { Col } from '@alfalab/core-components/grid/col';
import { Row } from '@alfalab/core-components/grid/row';
import MoneyInput from 'arui-feather/money-input';

import { useUpdateTransactionStatusMutation } from 'services/api/transactionAPI';
import { StatusMessage } from '../index';

type PropTypes = {
  title: string;
  id: number;
  merchantOrderId: number;
  handleClose: () => void;
};

const OrderCancel: FC<PropTypes> = ({
  id,
  merchantOrderId,
  title,
  handleClose
}) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();
  const [formStep, setFormStep] = useState(1);
  // const [isFullCompensation, setIsFullCompensation] = useState(false);

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

  const [updateStatus, { isSuccess, isError, error }] =
    useUpdateTransactionStatusMutation();

  const onSubmit = () => {
    updateStatus({
      id,
      body: {
        merchantId: '1',
        orders: [
          {
            orderId: merchantOrderId,
            status: 'canceled'
          }
        ]
      }
    });
  };

  const handleClick = () => {
    setFormStep(prev => prev + 1);
  };

  if (isSuccess) {
    return <StatusMessage status="success" title="" />;
  }

  if (isError) {
    // @ts-ignore
    return <StatusMessage status="error" title={error?.data} />;
  }

  return (
    <>
      <Typography.Title tag="h2" view="medium" weight="bold">
        {title} №{merchantOrderId}
      </Typography.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formStep === 1 && (
          <>
            <FormField size="m">
              <p className="modal__subtitle">
                {t('transactions.modal.subtitle.cancel')}
              </p>
            </FormField>
            <FormField size="m">
              <Controller
                name="reason"
                control={control}
                rules={{
                  required: true
                }}
                render={({ field }) => (
                  <Select
                    size="m"
                    mode="radio-check"
                    width="available"
                    className="select_theme_alfa-on-white select-button"
                    options={options}
                    {...field}
                  />
                )}
              />
            </FormField>
            <Row align="middle" className="modal-responsive__footer">
              <Col>
                <Button
                  size="m"
                  view="extra"
                  width="available"
                  onClick={handleClick}
                >
                  {t('button.confirm')}
                </Button>
              </Col>
              <Col>
                <Button
                  size="m"
                  view="default"
                  width="available"
                  onClick={handleClose}
                >
                  {t('button.cancel')}
                </Button>
              </Col>
            </Row>
          </>
        )}
        {formStep === 2 && (
          <>
            <FormField size="m">
              <p className="modal__subtitle">
                {t('transactions.modal.subtitle.compensationType')}
              </p>
            </FormField>
            <Row className="modal-responsive__footer">
              <Col>
                <Button
                  size="m"
                  view="extra"
                  width="available"
                  onClick={handleClick}
                >
                  {t('transactions.modal.button.fullReturn')}
                </Button>
              </Col>
              <Col>
                <Button
                  size="m"
                  view="default"
                  width="available"
                  onClick={handleClick}
                >
                  {t('transactions.modal.button.partialReturn')}
                </Button>
              </Col>
              <Col>
                <Button size="m" view="default" width="available">
                  {t('button.cancel')}
                </Button>
              </Col>
            </Row>
          </>
        )}
        {formStep === 3 && (
          <>
            <FormField size="m" />
            <FormField size="m">
              <Controller
                name="compensationAmount"
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { value, onChange } }) => (
                  <MoneyInput
                    showCurrency
                    currencyCode="KZT"
                    bold
                    size="m"
                    width="available"
                    label={t('transactions.modal.input.compensationAmount')}
                    value={value?.toString().replace(/\s/g, '')}
                    onChange={inputValue => onChange(inputValue)}
                    error={!!errors?.compensationAmount}
                  />
                )}
              />
            </FormField>
          </>
        )}
        {formStep === 3 && (
          <Row align="middle" className="modal-responsive__footer">
            <Col>
              <Button size="m" view="extra" width="available" type="submit">
                {t('button.confirm')}
              </Button>
            </Col>
            <Col>
              <Button
                size="m"
                view="default"
                width="available"
                onClick={handleClose}
              >
                {t('button.sendAgain')}
              </Button>
            </Col>
          </Row>
        )}
      </form>
    </>
  );
};

export default OrderCancel;
