import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-grid-system';
import Input from 'arui-feather/input';
import FormField from 'arui-feather/form-field';
import IntlPhoneInput from 'arui-feather/intl-phone-input';
import CalendarInput from 'arui-feather/calendar-input';
import { Select } from 'arui-feather/select';
import { Label } from 'arui-feather/label';
import { MoneyInput } from 'arui-feather/money-input';

type FieldType = {
  field: any;
};

export const Filter: FC = () => {
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <Label size="l" className="bold_700">
        {t('transactions.filter.title')}
      </Label>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={4} sm={6} xs={12}>
            <FormField size="m">
              <Controller
                name="orderNumber"
                control={control}
                render={({ field }: FieldType) => (
                  <Input
                    size="m"
                    width="available"
                    label={t('transactions.filter.orderNumber')}
                    {...field}
                  />
                )}
              />
            </FormField>
            <FormField size="m">
              <Controller
                name="transactionNumber"
                control={control}
                render={({ field }: FieldType) => (
                  <Input
                    size="m"
                    width="available"
                    label={t('transactions.filter.transactionNumber')}
                    {...field}
                  />
                )}
              />
            </FormField>
          </Col>
          <Col md={4} sm={6} xs={12}>
            <FormField size="m">
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }: FieldType) => (
                  <IntlPhoneInput
                    size="m"
                    label={t('transactions.filter.phoneNumber')}
                    {...field}
                  />
                )}
              />
            </FormField>
            <FormField size="m">
              <Controller
                name="createdDate"
                control={control}
                render={({ field }: FieldType) => (
                  <CalendarInput
                    size="m"
                    width="available"
                    label={t('transactions.filter.createdDate')}
                    {...field}
                  />
                )}
              />
            </FormField>
          </Col>
          <Col md={4} sm={12} xs={12}>
            <Row>
              <Col md={6} sm={6} xs={12}>
                <FormField size="m">
                  <Controller
                    name="orderStatus"
                    control={control}
                    render={({ field }: FieldType) => (
                      <Select
                        size="m"
                        mode="radio"
                        width="available"
                        options={[]}
                        label={t('transactions.filter.orderStatus')}
                        {...field}
                      />
                    )}
                  />
                </FormField>
              </Col>
              <Col md={6} sm={6} xs={12}>
                <FormField size="m">
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }: FieldType) => (
                      <MoneyInput
                        showCurrency={true}
                        currencyCode="KZT"
                        width="available"
                        label={t('transactions.filter.amount')}
                        {...field}
                      />
                    )}
                  />
                </FormField>
              </Col>
            </Row>
            <FormField size="m">
              <Controller
                name="deliveredDate"
                control={control}
                render={({ field }: FieldType) => (
                  <CalendarInput
                    size="m"
                    width="available"
                    label={t('transactions.filter.deliveredDate')}
                    {...field}
                  />
                )}
              />
            </FormField>
          </Col>
        </Row>
      </form>
    </>
  );
};
