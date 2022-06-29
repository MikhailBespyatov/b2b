import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Label } from 'arui-feather/label';
import FormField from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import Select from 'arui-feather/select';
import { Grid } from '@alfalab/core-components/grid';

const MailingAddress: FC = () => {
  const { t } = useTranslation();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      country: undefined,
      city: undefined,
      postalCode: '',
      street: '',
      house: '',
      office: '',
      okato: '',
      matchEmail: false
    }
  });

  const onSubmit = handleSubmit((values: any) => {
    console.log(values);
  });

  return (
    <>
      <Label size="l" className="bold-700">
        {t('partner.new.header.mailingAddress')}
      </Label>
      <form onSubmit={onSubmit} className="mt-16 mb-24">
        <Grid.Row className="container">
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 12, m: 8, l: 8 },
              desktop: { s: 7, m: 7, l: 7 }
            }}
          >
            <FormField size="m">
              <Controller
                name="country"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      size="s"
                      width="available"
                      label={t('partner.new.form.legal.country')}
                      mode="radio"
                      options={[
                        {
                          value: '',
                          text: 'Не выбран'
                        }
                      ]}
                      {...field}
                    />
                  );
                }}
              />
            </FormField>
          </Grid.Col>
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 12, m: 8, l: 8 },
              desktop: { s: 7, m: 7, l: 7 }
            }}
          >
            <FormField size="m">
              <Controller
                name="city"
                control={control}
                rules={{
                  required: true
                }}
                render={({ field }) => {
                  return (
                    <Select
                      size="s"
                      width="available"
                      label={t('partner.new.form.legal.city')}
                      mode="radio"
                      options={[
                        {
                          value: '',
                          text: 'Не выбран'
                        }
                      ]}
                      {...field}
                    />
                  );
                }}
              />
            </FormField>
          </Grid.Col>
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 12, m: 8, l: 8 },
              desktop: { s: 7, m: 7, l: 7 }
            }}
          >
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    size="s"
                    label={t('partner.new.form.legal.postalCode')}
                    width="available"
                    maxLength={120}
                    hint={
                      <div className="t-right">{field.value.length}/120</div>
                    }
                    clear
                    {...field}
                  />
                );
              }}
            />
          </Grid.Col>
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 12, m: 8, l: 8 },
              desktop: { s: 7, m: 7, l: 7 }
            }}
          >
            <Controller
              name="street"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    size="s"
                    label={t('partner.new.form.legal.street')}
                    width="available"
                    maxLength={120}
                    hint={
                      <div className="t-right">{field.value.length}/120</div>
                    }
                    clear
                    {...field}
                  />
                );
              }}
            />
          </Grid.Col>
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 12, m: 8, l: 8 },
              desktop: { s: 7, m: 7, l: 7 }
            }}
          >
            <Controller
              name="house"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    size="s"
                    label={t('partner.new.form.legal.house')}
                    width="available"
                    maxLength={120}
                    hint={
                      <div className="t-right">{field.value.length}/120</div>
                    }
                    clear
                    {...field}
                  />
                );
              }}
            />
          </Grid.Col>
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 12, m: 8, l: 8 },
              desktop: { s: 7, m: 7, l: 7 }
            }}
          >
            <Controller
              name="office"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    size="s"
                    label={t('partner.new.form.legal.office')}
                    width="available"
                    maxLength={120}
                    hint={
                      <div className="t-right">{field.value.length}/120</div>
                    }
                    clear
                    {...field}
                  />
                );
              }}
            />
          </Grid.Col>
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 12, m: 8, l: 8 },
              desktop: { s: 7, m: 7, l: 7 }
            }}
          >
            <Controller
              name="okato"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    size="s"
                    label={t('partner.new.form.legal.okato')}
                    width="available"
                    maxLength={120}
                    hint={
                      <div className="t-right">{field.value.length}/120</div>
                    }
                    clear
                    {...field}
                  />
                );
              }}
            />
          </Grid.Col>
        </Grid.Row>
      </form>
    </>
  );
};

export default MailingAddress;
