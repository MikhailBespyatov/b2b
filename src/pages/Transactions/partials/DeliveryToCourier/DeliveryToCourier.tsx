import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField } from 'arui-feather/form-field';
import Button from 'arui-feather/button';
import { Typography } from '@alfalab/core-components/typography';
import { Col } from '@alfalab/core-components/grid/col';
import { Row } from '@alfalab/core-components/grid/row';
import { Spinner } from '@alfalab/core-components/spinner';

import { useUpdateTransactionStatusMutation } from 'services/api/transactionAPI';
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

  const [updateStatus, { isLoading, isSuccess }] =
    useUpdateTransactionStatusMutation();

  const handleSubmit = () => {
    updateStatus({
      id,
      body: {
        merchantId: '1',
        orders: [
          {
            orderId: merchantOrderId,
            status: 'readyDelivery'
          }
        ]
      }
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
      <div className="modal-responsive__footer">
        <Row align="middle">
          <Col>
            <Button
              size="l"
              view="extra"
              width="available"
              onClick={handleSubmit}
              disabled={isLoading}
              icon={isLoading && <Spinner visible />}
            >
              {t('button.send')}
            </Button>
          </Col>
          <Col>
            <Button size="l" view="default" width="available">
              {t('button.cancel')}
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DeliveryToCourier;
