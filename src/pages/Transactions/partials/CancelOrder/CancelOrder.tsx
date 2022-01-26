import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField } from 'arui-feather/form-field';
import Button from 'arui-feather/button';
import { Typography } from '@alfalab/core-components/typography';
import { Col } from '@alfalab/core-components/grid/col';
import { Row } from '@alfalab/core-components/grid/row';
import { Spinner } from '@alfalab/core-components/spinner';

import { useUpdateTransactionStatusMutation } from '../../../../services/api/transactionAPI';

type PropTypes = {
  title: string;
  orderId: number;
};

export const CancelOrder: FC<PropTypes> = ({ orderId, title }) => {
  const { t } = useTranslation();

  const [updateStatus, { isLoading }] = useUpdateTransactionStatusMutation();

  const handleSubmit = () => {
    updateStatus({
      merchantId: '121123',
      orders: [
        {
          orderId: orderId,
          status: 'cancelled'
        }
      ]
    });
  };

  return (
    <>
      <FormField size="m">
        <Typography.Title tag="h2" view="medium" weight="bold">
          {title} №{orderId}
        </Typography.Title>
      </FormField>
      <div className="modal-responsive__footer">
        <Row align="middle">
          <Col>
            <Button
              size="l"
              view="extra"
              width="available"
              onClick={handleSubmit}
              disabled={isLoading}
              icon={isLoading && <Spinner visible={true} />}
            >
              {t('transactions.modal.button.confirm')}
            </Button>
          </Col>
          <Col>
            <Button size="l" view="default" width="available">
              {t('transactions.modal.button.cancel')}
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};
