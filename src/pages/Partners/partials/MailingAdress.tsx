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
  cityList: ISelect[];
  counter: number;
  control: Control<any>;
  errors: any;
};

const MailingAddress: FC<PropsType> = ({
  cityList,
  counter,
  control,
  errors
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Label size="l" className="bold-700 mb-24">
        {t('partner.new.header.mailingAddress')}
      </Label>
      <Grid.Row className="container mt-16 mb-24">
        <Grid.Col
          width={{
            mobile: { s: 12, m: 12, l: 12 },
            tablet: { s: 12, m: 8, l: 8 },
            desktop: { s: 7, m: 7, l: 7 }
          }}
        >
          <FormField size="s">
            <Controller
              name={`Adresses[${counter}].city`}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => {
                return (
                  <Select
                    size="s"
                    width="available"
                    label={
                      <span className="required">
                        {t('partner.new.form.legal.city')}
                      </span>
                    }
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
                    error={!!errors?.city}
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
            name={`Adresses[${counter}].postIndex`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <Input
                  size="s"
                  label={
                    <span className="required">
                      {t('partner.new.form.legal.postalCode')}
                    </span>
                  }
                  width="available"
                  maxLength={120}
                  hint={
                    <div className="t-right">
                      {field.value?.length || 0}/120
                    </div>
                  }
                  clear
                  error={!!errors?.postIndex}
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
            name={`Adresses[${counter}].street`}
            control={control}
            render={({ field }) => {
              return (
                <Input
                  size="s"
                  label={t('partner.new.form.legal.street')}
                  width="available"
                  maxLength={120}
                  hint={
                    <div className="t-right">
                      {field.value?.length || 0}/120
                    </div>
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
            name={`Adresses[${counter}].house`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <Input
                  size="s"
                  label={
                    <span className="required">
                      {t('partner.new.form.legal.house')}
                    </span>
                  }
                  width="available"
                  maxLength={120}
                  hint={
                    <div className="t-right">
                      {field.value?.length || 0}/120
                    </div>
                  }
                  clear
                  error={!!errors?.house}
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
            name={`Adresses[${counter}].flat`}
            control={control}
            render={({ field }) => {
              return (
                <Input
                  size="s"
                  label={t('partner.new.form.legal.office')}
                  width="available"
                  maxLength={120}
                  hint={
                    <div className="t-right">
                      {field.value?.length || 0}/120
                    </div>
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
            name={`Adresses[${counter}].okato`}
            control={control}
            render={({ field }) => {
              return (
                <Input
                  size="s"
                  label={t('partner.new.form.legal.okato')}
                  width="available"
                  maxLength={120}
                  hint={
                    <div className="t-right">
                      {field.value?.length || 0}/120
                    </div>
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
