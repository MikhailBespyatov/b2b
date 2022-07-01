import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Label } from 'arui-feather/label';
import FormField from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import Select from 'arui-feather/select';
import { Grid } from '@alfalab/core-components/grid';
import { ISelect } from '../../../models/ISelect';

type PropsType = {
  countryList: ISelect[];
  cityList: ISelect[];
  counter: number;
  control: Control<any>;
};

const MailingAddress: FC<PropsType> = ({
  countryList,
  cityList,
  counter,
  control
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Label size="l" className="bold-700">
        {t('partner.new.header.mailingAddress')}
      </Label>
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
              name={`Addresses[${counter}].country`}
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
                      },
                      ...countryList
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
              name={`Addresses[${counter}].city`}
              control={control}
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
                      },
                      ...cityList
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
            name={`Addresses[${counter}].postIndex`}
            control={control}
            render={({ field }) => {
              return (
                <Input
                  size="s"
                  label={t('partner.new.form.legal.postalCode')}
                  width="available"
                  maxLength={120}
                  hint={
                    <div className="t-right">{field.value?.length}/120</div>
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
            name={`Addresses[${counter}].street`}
            control={control}
            render={({ field }) => {
              return (
                <Input
                  size="s"
                  label={t('partner.new.form.legal.street')}
                  width="available"
                  maxLength={120}
                  hint={
                    <div className="t-right">{field.value?.length}/120</div>
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
            name={`Addresses[${counter}].house`}
            control={control}
            render={({ field }) => {
              return (
                <Input
                  size="s"
                  label={t('partner.new.form.legal.house')}
                  width="available"
                  maxLength={120}
                  hint={
                    <div className="t-right">{field.value?.length}/120</div>
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
            name={`Addresses[${counter}].flat`}
            control={control}
            render={({ field }) => {
              return (
                <Input
                  size="s"
                  label={t('partner.new.form.legal.office')}
                  width="available"
                  maxLength={120}
                  hint={
                    <div className="t-right">{field.value?.length}/120</div>
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
            name={`Addresses[${counter}].okato`}
            control={control}
            render={({ field }) => {
              return (
                <Input
                  size="s"
                  label={t('partner.new.form.legal.okato')}
                  width="available"
                  maxLength={120}
                  hint={
                    <div className="t-right">{field.value?.length}/120</div>
                  }
                  clear
                  {...field}
                />
              );
            }}
          />
        </Grid.Col>
      </Grid.Row>
    </>
  );
};

export default MailingAddress;
