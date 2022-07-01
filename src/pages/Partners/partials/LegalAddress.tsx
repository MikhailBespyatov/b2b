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
  control: Control<any>;
};

const LegalAddress: FC<PropsType> = ({ countryList, cityList, control }) => {
  const { t } = useTranslation();
  return (
    <>
      <Label size="l" className="bold-700">
        {t('partner.new.header.legalAddress')}
      </Label>
      <Grid.Row className="container mt-16">
        <Grid.Col
          width={{
            mobile: { s: 12, m: 12, l: 12 },
            tablet: { s: 12, m: 8, l: 8 },
            desktop: { s: 7, m: 7, l: 7 }
          }}
        >
          <FormField size="s">
            <Controller
              name="Adresses[0].country"
              control={control}
              render={({ field: { value, onChange } }) => {
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
                    value={[value]}
                    onChange={(values: number[] | undefined) => {
                      if (values) {
                        onChange(values?.[0]);
                      }
                    }}
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
              name="Adresses[0].city"
              control={control}
              render={({ field: { value, onChange } }) => {
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
                    value={[value]}
                    onChange={(values: number[] | undefined) => {
                      if (values) {
                        onChange(values?.[0]);
                      }
                    }}
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
            name="Adresses[0].postIndex"
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
            name="Adresses[0].street"
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
            name="Adresses[0].house"
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
            name="Adresses[0].flat"
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
            name="Adresses[0].okato"
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

export default LegalAddress;
