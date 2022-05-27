import React, { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { FormField } from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import Button from 'arui-feather/button';
import { Typography } from '@alfalab/core-components/typography';
import { Spinner } from '@alfalab/core-components/spinner';
import { Row } from '@alfalab/core-components/grid/row';
import { Col } from '@alfalab/core-components/grid/col';

import { IOrderInfo } from 'models/IOrder';
import {
  usePostCheckOtpMutation,
  usePostSendOtpMutation
} from 'services/api/transactionAPI';
import { RootStateType } from 'redux/store';
import { selectMerchant } from 'redux/slices/app-slice';
import { StatusMessage } from '../index';

type PropTypes = {
  order: IOrderInfo;
  successMessage: string;
};

const SmsConfirm: FC<PropTypes> = ({ order, successMessage }) => {
  const { t } = useTranslation();
  const { partnerCode } = useSelector((state: RootStateType) =>
    selectMerchant(state)
  );
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
        merchantId: partnerCode,
        amount: order.amount
      }
    });
  }, [
    postSendOtp,
    order.id,
    order.merchant_order_id,
    order.amount,
    partnerCode
  ]);

  const handleOtpResend = () => {
    postSendOtp({
      id: order.id,
      body: {
        merchantOrderId: order.merchant_order_id,
        merchantId: partnerCode,
        amount: order.amount
      }
    });
    lastMutation.current?.unsubscribe();
  };

  const onSubmit = ({ otp }: { otp: string }) => {
    lastMutation.current = postCheckOtp({
      id: order.id,
      body: {
        merchantOrderId: order.merchant_order_id,
        merchantId: partnerCode,
        amount: order.amount,
        otp
      }
    });
  };

  if (hasCheckedOtp) {
    return <StatusMessage status="success" title={successMessage} />;
  }

  if (isFailedOtp && errorOtp && 'data' in errorOtp) {
    return <StatusMessage status="error" title={errorOtp?.data?.message} />;
  }

  return (
    <>
      <Typography.Title
        tag="h2"
        view="medium"
        weight="bold"
        className="modal-responsive--title"
      >
        {t('transactions.modal.title.confirmDelivery')}
      </Typography.Title>
      <p className="modal-responsive--subtitle">
        {t('transactions.modal.subtitle.confirmDelivery', {
          orderNumber: order.merchant_order_id
        })}
      </p>
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
                {t('button.confirm')}
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
                {t('button.resend')}
              </Button>
            </Col>
          </Row>
        </div>
      </form>
    </>
  );
};

export default SmsConfirm;
