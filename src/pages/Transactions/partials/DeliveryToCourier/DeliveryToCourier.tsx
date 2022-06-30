import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FormField } from 'arui-feather/form-field';
import Button from 'arui-feather/button';
import { Typography } from '@alfalab/core-components/typography';
import { Spinner } from '@alfalab/core-components/spinner';

import { useUpdateTransactionStatusMutation } from 'services/api/transactionApi';
import { RootStateType } from 'redux/store';
import { selectMerchant } from 'redux/slices/app-slice';
import { StatusMessage } from '../index';

type PropTypes = {
  id: number;
  title: string;
  text: string;
  successMessage: string;
  merchantOrderId: number;
};

const DeliveryToCourier: FC<PropTypes> = ({
  id,
  title,
  text,
  successMessage,
  merchantOrderId
}) => {
  const { t } = useTranslation();
  const { partnerCode } = useSelector((state: RootStateType) =>
    selectMerchant(state)
  );
  const [updateStatus, { isLoading, isSuccess }] =
    useUpdateTransactionStatusMutation();

  const handleSubmit = () => {
    updateStatus({
      id,
      body: [
        {
          merchantId: partnerCode,
          orders: [
            {
              orderId: merchantOrderId,
              status: 'readyDelivery'
            }
          ]
        }
      ]
    });
  };

  if (isSuccess) {
    return <StatusMessage status="success" title={successMessage} />;
  }

  return (
    <>
      <FormField size="m">
        <Typography.Title tag="h4" view="medium" weight="bold">
          {title}
        </Typography.Title>
      </FormField>
      <Typography.Text view="primary-medium">{text}</Typography.Text>
      <div className="mt-24">
        <Button
          size="l"
          view="extra"
          onClick={handleSubmit}
          disabled={isLoading}
          icon={isLoading && <Spinner visible />}
        >
          {t('button.send')}
        </Button>
        <Button size="l" view="default">
          {t('button.cancel')}
        </Button>
      </div>
    </>
  );
};

export default DeliveryToCourier;
