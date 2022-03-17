import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { FormField } from 'arui-feather/form-field';
import Button from 'arui-feather/button';
import { Select } from 'arui-feather/select';
import { Typography } from '@alfalab/core-components/typography';
import { Col } from '@alfalab/core-components/grid/col';
import { Row } from '@alfalab/core-components/grid/row';
import { Spinner } from '@alfalab/core-components/spinner';

import { useUpdateTransactionStatusMutation } from 'services/api/transactionAPI';
import { StatusMessage } from '../index';

type PropTypes = {
  title: string;
  id: number;
  merchantOrderId: number;
  handleClose: () => void;
};

const CancellationReason: FC<PropTypes> = ({
  id,
  merchantOrderId,
  title,
  handleClose
}) => {
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm();

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

  const [updateStatus, { isLoading, isSuccess, isError, error }] =
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

  if (isSuccess) {
    return <StatusMessage status="success" title="" />;
  }

  if (isError) {
    // @ts-ignore
    return <StatusMessage status="error" title={error?.data} />;
  }

  return (
    <>
      <FormField size="m">
        <Typography.Title tag="h2" view="medium" weight="bold">
          {title} №{merchantOrderId}
        </Typography.Title>
        <p className="modal__subtitle">
          {t('transactions.modal.subtitle.cancel')}
        </p>
      </FormField>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="modal-responsive__footer">
          <Row align="middle">
            <Col>
              <Button
                size="l"
                view="extra"
                type="submit"
                width="available"
                disabled={isLoading}
                icon={isLoading && <Spinner visible />}
              >
                {t('button.confirm')}
              </Button>
            </Col>
            <Col>
              <Button
                size="l"
                view="default"
                width="available"
                onClick={handleClose}
              >
                {t('button.cancel')}
              </Button>
            </Col>
          </Row>
        </div>
      </form>
    </>
  );
};

export default CancellationReason;
