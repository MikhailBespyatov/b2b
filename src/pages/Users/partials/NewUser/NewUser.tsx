import { Button } from '@alfalab/core-components/button';
import { Grid } from '@alfalab/core-components/grid';
import { Typography } from '@alfalab/core-components/typography';
import FormField from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import { PhoneInput } from 'arui-feather/phone-input';
import { Select } from 'arui-feather/select';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Switch } from '@alfalab/core-components/switch';
import { useAddNewUserMutation } from 'services/api/usersApi';
import { phoneValidator } from 'utils/validator/phoneValidator';
import { emailValidator } from 'utils/validator/emailValidator';
import s from './NewUser.module.css';

export const NewUser = () => {
  const { t } = useTranslation();
  const [postNewUser] = useAddNewUserMutation({});
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      lastName: '',
      name: '',
      middleName: '',
      phoneNumber: '',
      email: '',
      role: ['manager'],
      status: true
    }
  });

  const status = watch('status');

  const onSubmit = handleSubmit((data: any) => {
    const { email, status: formStatus, role, ...restData } = data;

    postNewUser({
      body: {
        users: [
          {
            ...restData,
            password: 'string',
            login: email,
            status: formStatus ? 'active' : 'inactive',
            merchantId: 'adika.kz',
            role: role[0]
          }
        ]
      }
    });
  });

  return (
    <div className={s.wrapper}>
      <Typography.Title tag="h1" className={s.title}>
        {t('user.new.title')}
      </Typography.Title>
      <div className={s.form_wrapper}>
        <form onSubmit={onSubmit}>
          <Grid.Row className="container">
            <Grid.Col
              width={{
                mobile: { s: 12, m: 12, l: 12 },
                tablet: { s: 12, m: 8, l: 8 },
                desktop: { s: 7, m: 7, l: 7 }
              }}
              className={s.statusTitleWrapper}
            >
              <Typography.Text className={s.statusTitle}>
                {t('user.new.statusTitle')}
              </Typography.Text>
            </Grid.Col>
            <Grid.Col
              width={{
                mobile: { s: 12, m: 12, l: 12 },
                tablet: { s: 12, m: 8, l: 8 },
                desktop: { s: 7, m: 7, l: 7 }
              }}
              className={s.statusWrapper}
            >
              <Typography.Text className={s.statusLabel}>
                {status
                  ? t('user.new.form.statusActive')
                  : t('user.new.form.statusInActive')}
              </Typography.Text>
              <FormField size="m">
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onBlur, onChange, value } }) => {
                    return (
                      <Switch
                        onBlur={onBlur}
                        onChange={onChange}
                        checked={value}
                        align="center"
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
                  name="lastName"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        size="s"
                        label={t('user.new.form.lastName')}
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
              <FormField size="m">
                <Controller
                  name="name"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        size="s"
                        label={t('user.new.form.firstName')}
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
              <FormField size="m">
                <Controller
                  name="middleName"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        size="s"
                        label={t('user.new.form.middleName')}
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
              <FormField size="m">
                <Controller
                  name="phoneNumber"
                  rules={{
                    required: true,
                    validate: phoneValidator
                  }}
                  control={control}
                  render={({ field }) => {
                    return (
                      <PhoneInput
                        size="s"
                        label={t('user.new.form.phoneNumber')}
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
              <FormField size="m">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                    validate: emailValidator
                  }}
                  render={({ field }) => {
                    return (
                      <Input
                        size="s"
                        label={t('user.new.form.email')}
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
              <FormField size="m">
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        size="m"
                        width="available"
                        className={s.roleTitle}
                        label={t('user.new.form.role')}
                        mode="radio"
                        options={[
                          {
                            value: 'admin',
                            text: t('user.new.form.role.admin')
                          },
                          {
                            value: 'manager',
                            text: t('user.new.form.role.manager')
                          },
                          {
                            value: 'courier',
                            text: t('user.new.form.role.courier')
                          }
                        ]}
                        {...field}
                      />
                    );
                  }}
                />
              </FormField>
            </Grid.Col>
          </Grid.Row>
          <Button type="submit">Добавить</Button>
        </form>
      </div>
    </div>
  );
};
