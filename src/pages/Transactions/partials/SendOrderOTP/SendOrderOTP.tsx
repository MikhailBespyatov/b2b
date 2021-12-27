import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField } from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import { Typography } from '@alfalab/core-components/typography';
import { Button } from '@alfalab/core-components/button';

export const SendOrderOTP: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <FormField size="m">
        <Typography.Title tag="h2" view="medium" weight="bold">
          {t('transactions.modal.title.sendOrder')}
        </Typography.Title>
      </FormField>
      <FormField size="m">
        <Input
          type="tel"
          pattern="[0-9]{4}"
          size="m"
          width="available"
          label={t('transactions.modal.input.otp')}
        />
      </FormField>
      <div className="modal-responsive__footer">
        <Button size="m" view="primary">
          {t('transactions.modal.button.confirm')}
        </Button>
      </div>
    </>
  );
};
