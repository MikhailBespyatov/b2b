import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from 'arui-feather/button';
import FormField from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import { PhoneInput } from 'arui-feather/phone-input';
import Select from 'arui-feather/select';
import { Grid } from '@alfalab/core-components/grid';
import { Typography } from '@alfalab/core-components/typography';
import { Switch } from '@alfalab/core-components/switch';
import { useAddNewUserMutation } from 'services/api/usersApi';
import { phoneValidator } from 'utils/validator/phoneValidator';
import { emailValidator } from 'utils/validator/emailValidator';

import { useDispatch } from 'react-redux';
import { addToast } from 'redux/slices/app-slice';
import { uuid } from 'utils/uuid';
import { Skeleton } from '@alfalab/core-components/skeleton';
import { emailErrorMessage, requiredText } from 'constants/validation-text';
import s from './NewUser.module.css';

export const NewUser: FC = () => {
  const { t } = useTranslation();

  const [postNewUser, { error, isError, isLoading }] = useAddNewUserMutation(
    {}
  );
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      lastName: '',
      firstName: '',
      middleName: '',
      phoneNumber: '',
      email: '',
      role: ['manager'],
      status: true
    }
  });
  const dispatch = useDispatch();

  const status = watch('status');

  const onSubmit = handleSubmit((data: any) => {
    const { email, status: formStatus, role, ...restData } = data;

    postNewUser({
      body: {
        ...restData,
        password: 'string',
        login: email,
        status: formStatus ? 'active' : 'inactive',
        merchantId: 'adika.kz',
        role: role[0]
      }
    })
      .then(res => {
        // @ts-ignore
        if (res?.error) {
          dispatch(
            addToast({
              id: uuid(),
              badge: 'negative',
              text: t('status.error'),
              title: ''
            })
          );
        } else {
          dispatch(
            addToast({
              id: uuid(),
              badge: 'positive',
              text: t('user.new.form.success'),
              title: ''
            })
          );
        }
      })
      .catch(() => {
        dispatch(
          addToast({
            id: uuid(),
            badge: 'negative',
            text: t('status.error'),
            title: ''
          })
        );
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
              {isLoading ? (
                <Skeleton className={s.skeleton} visible animate>
                  -
                </Skeleton>
              ) : (
                <FormField size="m">
                  <Controller
                    name="lastName"
                    rules={{ required: requiredText }}
                    control={control}
                    render={({
                      field,
                      fieldState: { error: lastNameError }
                    }) => {
                      return (
                        <Input
                          size="s"
                          label={t('user.new.form.lastName')}
                          width="available"
                          error={lastNameError?.message}
                          resetError={false}
                          {...field}
                        />
                      );
                    }}
                  />
                </FormField>
              )}
            </Grid.Col>
            <Grid.Col
              width={{
                mobile: { s: 12, m: 12, l: 12 },
                tablet: { s: 12, m: 8, l: 8 },
                desktop: { s: 7, m: 7, l: 7 }
              }}
            >
              {isLoading ? (
                <Skeleton className={s.skeleton} visible animate>
                  -
                </Skeleton>
              ) : (
                <FormField size="m">
                  <Controller
                    name="firstName"
                    rules={{ required: requiredText }}
                    control={control}
                    render={({
                      field,
                      fieldState: { error: firstNameError }
                    }) => {
                      return (
                        <Input
                          size="s"
                          label={t('user.new.form.firstName')}
                          width="available"
                          {...field}
                          error={firstNameError?.message}
                          resetError={false}
                        />
                      );
                    }}
                  />
                </FormField>
              )}
            </Grid.Col>
            <Grid.Col
              width={{
                mobile: { s: 12, m: 12, l: 12 },
                tablet: { s: 12, m: 8, l: 8 },
                desktop: { s: 7, m: 7, l: 7 }
              }}
            >
              {isLoading ? (
                <Skeleton className={s.skeleton} visible animate>
                  -
                </Skeleton>
              ) : (
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
              )}
            </Grid.Col>
            <Grid.Col
              width={{
                mobile: { s: 12, m: 12, l: 12 },
                tablet: { s: 12, m: 8, l: 8 },
                desktop: { s: 7, m: 7, l: 7 }
              }}
            >
              {isLoading ? (
                <Skeleton className={s.skeleton} visible animate>
                  -
                </Skeleton>
              ) : (
                <FormField size="m">
                  <Controller
                    name="phoneNumber"
                    rules={{
                      required: requiredText,
                      validate: phoneValidator
                    }}
                    control={control}
                    render={({ field, fieldState: { error: phoneError } }) => {
                      return (
                        <PhoneInput
                          size="s"
                          label={t('user.new.form.phoneNumber')}
                          width="available"
                          placeholder="+7 000 000 00 00"
                          resetError={false}
                          error={phoneError?.message}
                          {...field}
                        />
                      );
                    }}
                  />
                </FormField>
              )}
            </Grid.Col>
            <Grid.Col
              width={{
                mobile: { s: 12, m: 12, l: 12 },
                tablet: { s: 12, m: 8, l: 8 },
                desktop: { s: 7, m: 7, l: 7 }
              }}
            >
              {isLoading ? (
                <Skeleton className={s.skeleton} visible animate>
                  -
                </Skeleton>
              ) : (
                <FormField size="m">
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: requiredText,
                      validate: emailValidator
                    }}
                    render={({ field, fieldState: { error: emailError } }) => {
                      return (
                        <Input
                          size="s"
                          error={
                            emailError?.message ||
                            (isError &&
                              // @ts-ignore
                              error?.data?.message === emailErrorMessage &&
                              emailErrorMessage)
                          }
                          resetError={false}
                          label={t('user.new.form.email')}
                          width="available"
                          {...field}
                        />
                      );
                    }}
                  />
                </FormField>
              )}
            </Grid.Col>
            <Grid.Col
              width={{
                mobile: { s: 12, m: 12, l: 12 },
                tablet: { s: 12, m: 8, l: 8 },
                desktop: { s: 7, m: 7, l: 7 }
              }}
            >
              {isLoading ? (
                <Skeleton className={s.skeleton} visible animate>
                  -
                </Skeleton>
              ) : (
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
                              text: t('user.role.admin')
                            },
                            {
                              value: 'manager',
                              text: t('user.role.manager')
                            },
                            {
                              value: 'courier',
                              text: t('user.role.courier')
                            }
                          ]}
                          {...field}
                        />
                      );
                    }}
                  />
                </FormField>
              )}
            </Grid.Col>
          </Grid.Row>
          <Button type="submit" className="primary-bg">
            Добавить
          </Button>
        </form>
      </div>
    </div>
  );
};
