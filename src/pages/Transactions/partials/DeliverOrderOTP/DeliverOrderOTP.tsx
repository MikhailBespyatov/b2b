import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField } from 'arui-feather/form-field';
import { Typography } from '@alfalab/core-components/typography';
import Input from 'arui-feather/input';
import { Row } from '@alfalab/core-components/grid/row';
import { Col } from '@alfalab/core-components/grid/col';
import { Button } from '@alfalab/core-components/button';

export const DeliverOrderOTP: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <FormField size="m">
        <Typography.Title tag="h2" view="medium" weight="bold">
          {t('transactions.modal.title.confirmDelivery')}
        </Typography.Title>
        <p className="modal__subtitle">
          {t('transactions.modal.subtitle.confirmDelivery')}
        </p>
      </FormField>
      <FormField size="m">
        <Input
          type="tel"
          pattern="[0-9]{4}"
          size="m"
          width="available"
          label={t('transactions.modal.input.otp')}
          hint={t('transactions.modal.hint.confirmDelivery', {
            phoneNumber: '+771237127'
          })}
        />
      </FormField>
      <div className="modal-responsive__footer">
        <Row align="middle">
          <Col>
            <Button size="m" view="primary" block={true}>
              {t('transactions.modal.button.confirm')}
            </Button>
          </Col>
          <Col>
            <Button size="m" view="tertiary" block={true}>
              {t('transactions.modal.button.resend')}
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};
