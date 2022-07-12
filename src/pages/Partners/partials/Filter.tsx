import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Label } from 'arui-feather/label';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronForwardMIcon } from '@alfalab/icons-glyph/ChevronForwardMIcon';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Grid } from '@alfalab/core-components/grid';
import { Controller, useForm } from 'react-hook-form';
import { FormField } from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import Button from 'arui-feather/button';
import s from './Filter.module.css';

interface Values {
  fullName: string;
  login: string;
  registeredAt: string;
  merchantId: string;
  role: string;
  registeredByFIO: string;
}

interface Props {
  setFilter: (values: Values) => void;
}

const defaultValues: Values = {
  fullName: '',
  login: '',
  registeredAt: '',
  merchantId: '',
  role: '',
  registeredByFIO: ''
};

export const Filter = ({ setFilter }: Props) => {
  const { t } = useTranslation();
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const { handleSubmit, control, reset } = useForm({
    defaultValues
  });

  const handleFilterShow = () => {
    setIsFilterVisible(prev => !prev);
  };

  const onSubmit = handleSubmit(data => {
    const trimEntries = Object.entries(data).map(([key, value]) => [
      key,
      value.trim()
    ]);
    const registeredAt = data.registeredAt.split('.').reverse().join('-');
    const trimData = Object.fromEntries(trimEntries);
    setFilter({ ...trimData, registeredAt });
  });

  const handleReset = () => {
    reset();
  };

  return (
    <div className={s.wrapper}>
      <button type="button" className={s.button} onClick={handleFilterShow}>
        <Label size="l" className="bold-700">
          {t('transactions.filter.title')}
          <IconButton
            size="xxs"
            icon={isFilterVisible ? ChevronDownMIcon : ChevronForwardMIcon}
          />
        </Label>
      </button>
      {isFilterVisible && (
        <form onSubmit={onSubmit}>
          <Grid.Row className="container mt-24">
            <Grid.Col
              width={{
                mobile: { s: 12, m: 12, l: 12 },
                tablet: { s: 4, m: 4, l: 4 },
                desktop: { s: 4, m: 4, l: 4 }
              }}
            >
              <FormField size="m">
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        size="s"
                        label={t('partner.table.companyName')}
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
                tablet: { s: 4, m: 4, l: 4 },
                desktop: { s: 4, m: 4, l: 4 }
              }}
            >
              <FormField size="m">
                <Controller
                  name="login"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        size="s"
                        label={t('partner.table.bin')}
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
                tablet: { s: 4, m: 4, l: 4 },
                desktop: { s: 4, m: 4, l: 4 }
              }}
            >
              <FormField size="m">
                <Controller
                  name="registeredAt"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        size="s"
                        label={t('partner.table.city')}
                        width="available"
                        {...field}
                      />
                    );
                  }}
                />
              </FormField>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row className="container">
            <Grid.Col
              width={{
                mobile: { s: 12, m: 12, l: 12 },
                tablet: { s: 4, m: 4, l: 4 },
                desktop: { s: 4, m: 4, l: 4 }
              }}
            >
              <FormField size="m">
                <Controller
                  name="merchantId"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        size="s"
                        label={t('partner.table.partnerCode')}
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
                tablet: { s: 4, m: 4, l: 4 },
                desktop: { s: 4, m: 4, l: 4 }
              }}
            >
              <FormField size="m">
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        size="s"
                        label={t('partner.table.status')}
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
                tablet: { s: 4, m: 4, l: 4 },
                desktop: { s: 4, m: 4, l: 4 }
              }}
            >
              <FormField size="m">
                <Controller
                  name="registeredByFIO"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        size="s"
                        label={t('partner.table.pointCode')}
                        width="available"
                        {...field}
                      />
                    );
                  }}
                />
              </FormField>
            </Grid.Col>
          </Grid.Row>
          <div className="transactions__filter-footer">
            <Button view="extra" size="s" type="submit">
              {t('button.apply')}
            </Button>
            <Button size="s" onClick={handleReset}>
              {t('button.reset')}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
