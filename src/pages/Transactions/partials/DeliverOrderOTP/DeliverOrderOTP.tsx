import React, { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { FormField } from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import Button from 'arui-feather/button';
import { Typography } from '@alfalab/core-components/typography';
import { Spinner } from '@alfalab/core-components/spinner';
import { Row } from '@alfalab/core-components/grid/row';
import { Col } from '@alfalab/core-components/grid/col';

import { IOrder } from '../../../../models/IOrder';
import {
  usePostCheckOtpMutation,
  usePostSendOtpMutation
} from '../../../../services/api/transactionAPI';
import { OrderStatus } from '../OrderStatus';

type PropTypes = {
  order: IOrder;
};

export const DeliverOrderOTP: FC<PropTypes> = ({ order }) => {
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm();
  const lastMutation = useRef<any>(undefined);
  const [
    postSendOtp,
    {
      isLoading: isSendingOtp,
      isSuccess: hasSentOtp,
      isError: isFailedOtp,
      error: errorOtp
    }
  ] = usePostSendOtpMutation();
  const [
    postCheckOtp,
    {
      isLoading: isCheckingOtp,
      isSuccess: hasCheckedOtp,
      isError: isErrorCheckOtp
    }
  ] = usePostCheckOtpMutation();

  useEffect(() => {
    postSendOtp({
      id: order.id,
      body: {
        merchantOrderId: order.merchant_order_id,
        merchantId: '1'
      }
    });
  }, [postSendOtp, order.id, order.merchant_order_id]);

  const handleOtpResend = () => {
    postSendOtp({
      id: order.id,
      body: {
        merchantOrderId: order.merchant_order_id,
        merchantId: '1'
      }
    });
    lastMutation.current?.unsubscribe();
  };

  const onSubmit = ({ otp }: { otp: string }) => {
    lastMutation.current = postCheckOtp({
      id: order.id,
      body: {
        merchantOrderId: order.merchant_order_id,
        merchantId: '1',
        otp
      }
    });
  };

  if (hasCheckedOtp) {
    return (
      <OrderStatus
        status="success"
        title={t('transactions.modal.success.delivered')}
      />
    );
  }

  if (isFailedOtp) {
    //@ts-ignore
    return <OrderStatus status="error" title={errorOtp?.data?.message} />;
  }

  return (
    <>
      <FormField size="m">
        <Typography.Title tag="h2" view="medium" weight="bold">
          {t('transactions.modal.title.confirmDelivery')}
        </Typography.Title>
        <p className="modal__subtitle">
          {t('transactions.modal.subtitle.confirmDelivery', {
            orderNumber: order.merchant_order_id
          })}
        </p>
      </FormField>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField size="m">
          <Controller
            name="otp"
            control={control}
            rules={{
              required: true
            }}
            render={({ field }) => (
              <Input
                type="tel"
                pattern="[0-9]{4}"
                size="m"
                width="available"
                label={t('transactions.modal.input.smsCode')}
                hint={
                  hasSentOtp &&
                  !isErrorCheckOtp &&
                  t('transactions.modal.hint.confirmDelivery', {
                    phoneNumber: order.phoneNumber
                  })
                }
                error={
                  isErrorCheckOtp && t('transactions.modal.error.otpNoMatch')
                }
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
                type="submit"
                view="extra"
                width="available"
                disabled={isErrorCheckOtp || isCheckingOtp}
                icon={isCheckingOtp && <Spinner visible />}
              >
                {t('transactions.modal.button.confirm')}
              </Button>
            </Col>
            <Col>
              <Button
                size="l"
                width="available"
                onClick={handleOtpResend}
                disabled={isSendingOtp}
                icon={isSendingOtp && <Spinner visible />}
              >
                {t('transactions.modal.button.resend')}
              </Button>
            </Col>
          </Row>
        </div>
      </form>
    </>
  );
};
