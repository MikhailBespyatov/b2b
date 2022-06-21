import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid } from '@alfalab/core-components/grid';
import { Label } from 'arui-feather/label';
import PhoneInput from 'arui-feather/phone-input';
import FormField from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import Select from 'arui-feather/select';

const GeneralInfo: FC = () => {
  const { t } = useTranslation();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      legalName: undefined,
      bin: undefined,
      website: '',
      ukkNumber: '',
      phoneNumber: '',
      archiveCode: '',
      entityForm: undefined
    }
  });

  const onSubmit = handleSubmit((values: any) => {
    console.log(values);
  });

  return (
    <>
      <Label size="l" className="bold-700">
        {t('partner.new.header.general')}
      </Label>
      <form onSubmit={onSubmit} className="mt-24 mb-24">
        <Grid.Row className="container">
          <Grid.Col
            width={{
              mobile: { s: 12, m: 12, l: 12 },
              tablet: { s: 12, m: 8, l: 8 },
              desktop: { s: 7, m: 7, l: 7 }
            }}
          >
            <FormField size="s">
              <Controller
                name="legalName"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="s"
                      label={t('partner.new.form.general.legalName')}
                      width="available"
                      hint={t('hint.withoutQuotes')}
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
              tablet: { s: 12, m: 4, l: 4 },
              desktop: { s: 5, m: 5, l: 5 }
            }}
          >
            <FormField size="s">
              <Controller
                name="entityForm"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      size="s"
                      width="available"
                      label={t('partner.new.form.general.entityForm')}
                      mode="radio"
                      options={[
                        {
                          value: '',
                          text: 'Не выбран'
                        },
                        {
                          value: 'too',
                          text: 'ТОО'
                        },
                        {
                          value: 'oao',
                          text: 'ОАО'
                        },
                        {
                          value: 'zao',
                          text: 'ЗАО'
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
            <FormField size="s">
              <Controller
                name="bin"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="s"
                      label={t('partner.new.form.general.bin')}
                      width="available"
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
            <FormField size="s">
              <Controller
                name="website"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="s"
                      label={t('partner.new.form.general.website')}
                      width="available"
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
            <FormField size="s">
              <Controller
                name="ukkNumber"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="s"
                      label={t('partner.new.form.general.ukkNumber')}
                      width="available"
                      hint={t('hint.ukkNumber')}
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
            <FormField size="s">
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => {
                  return (
                    <PhoneInput
                      size="s"
                      label={t('partner.new.form.general.phoneNumber')}
                      width="available"
                      placeholder="+7 000 000 00 00"
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
            <FormField size="s">
              <Controller
                name="archiveCode"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="s"
                      label={t('partner.new.form.general.archiveCode')}
                      width="available"
                      hint={t('hint.ukkDB')}
                      {...field}
                    />
                  );
                }}
              />
            </FormField>
          </Grid.Col>
        </Grid.Row>
      </form>
    </>
  );
};

export default GeneralInfo;
