import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { Typography } from '@alfalab/core-components/typography';
import Input from 'arui-feather/input';
import { Grid } from '@alfalab/core-components/grid';
import { FormField } from 'arui-feather/form-field';
import Button from 'arui-feather/button';
import { Button as UIButton } from '@alfalab/core-components/button';

const Login: FC = () => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    setFocus,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  useEffect(() => {
    setFocus('email');
  }, []);

  const onSubmit = (values: any) => {
    handleSubmit(values);
  };

  return (
    <form onSubmit={onSubmit} style={{ marginTop: '15%' }}>
      <Grid.Row className="container mt-16 mb-24" justify="center">
        <Grid.Col
          width={{
            mobile: { s: 12, m: 12, l: 12 },
            tablet: { s: 12, m: 8, l: 6 },
            desktop: { s: 4, m: 4, l: 4 }
          }}
        >
          <FormField size="m">
            <Typography.Title view="large" tag="h1" className="title-2">
              {t('login.title')}
            </Typography.Title>
          </FormField>
          <FormField size="m">
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Input
                    size="s"
                    label="Email"
                    width="available"
                    error={!!errors?.email}
                    {...field}
                  />
                );
              }}
            />
          </FormField>
          <FormField size="m">
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => {
                return (
                  <Input
                    size="s"
                    type="password"
                    label={t('login.password')}
                    width="available"
                    error={!!errors?.password}
                    value={value}
                    onChange={onChange}
                  />
                );
              }}
            />
          </FormField>
          <div className="mt-24">
            <Button view="extra" size="m" className="primary-bg mr-24">
              {t('login.signIn')}
            </Button>
            <UIButton size="m" view="ghost">
              {t('login.resetPassword')}
            </UIButton>
          </div>
        </Grid.Col>
      </Grid.Row>
    </form>
  );
};

export default Login;
