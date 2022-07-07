import { Grid } from '@alfalab/core-components/grid';
import Input from 'arui-feather/input';
import { Switch } from '@alfalab/core-components/switch';
import { Typography } from '@alfalab/core-components/typography';
import { FormField } from 'arui-feather/form-field';
import { PhoneInput } from 'arui-feather/phone-input';
import { Select } from 'arui-feather/select';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetUserQuery, useUpdateUserMutation } from 'services/api/usersApi';
import { emailValidator } from 'utils/validator/emailValidator';
import { phoneValidator } from 'utils/validator/phoneValidator';
import { ReactComponent as EditIcon } from 'assets/images/edit_icon.svg';
import { ReactComponent as SuccessIcon } from 'assets/images/success_icon.svg';
import s from './UserPage.module.css';
import { defaultEditState } from './constants';

interface Props {
  title: string;
  value: string;
  onEdit: () => void;
}

const UserItem = ({ title, value, onEdit }: Props) => {
  return (
    <div className={s.userItemWrapper}>
      <div className={s.userItemContent}>
        <span className={s.userItemTitle}>{title}</span>
        <span className={s.userItemValue}>{value}</span>
      </div>
      <button type="button" onClick={onEdit} className={s.userItemButton}>
        <EditIcon />
      </button>
    </div>
  );
};

const SuccesButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button type="button" className={s.userItemButton} onClick={onClick}>
      <SuccessIcon />
    </button>
  );
};

export const UserPage = () => {
  const { login: userLogin } = useParams();
  const { data: userData } = useGetUserQuery(userLogin as string);
  const [updateUser] = useUpdateUserMutation();
  const { t } = useTranslation();
  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      lastName: '',
      name: '',
      middleName: '',
      phoneNumber: '',
      login: '',
      role: ['manager'],
      status: true,
      merchantId: ''
    }
  });
  const [editItems, setEditItems] = useState(defaultEditState);
  const watchedStatus = watch('status');
  const {
    isLastNameEdit,
    isFirstNameEdit,
    isMiddleNameEdit,
    isPhoneNumberEdit,
    isEmailEdit,
    isRoleEdit
  } = editItems;

  const onEdit = (itemName: string) => {
    setEditItems({ ...editItems, [itemName]: true });
  };

  const onSubmit = handleSubmit((data: any) => {
    console.log(data);
    updateUser({
      body: {
        ...data,
        role: data.role[0],
        status: data.status ? 'active' : 'inactive',
        merchantId: userData.merchantId,
        jobTitle: data.role[0]
      }
    });
  });

  const onSuccess = async (itemName: string) => {
    await onSubmit();
    setEditItems({ ...editItems, [itemName]: false });
  };

  useEffect(() => {
    if (userData) {
      const {
        lastName,
        firstName,
        middleName,
        phoneNumber,
        login,
        role,
        status
      } = userData;
      setValue('lastName', lastName);
      setValue('name', firstName);
      setValue('middleName', middleName);
      setValue('phoneNumber', phoneNumber);
      setValue('login', login);
      setValue('role', [role]);
      setValue('status', status === 'active');
    }
  }, [userData]);

  return (
    <div className={s.wrapper}>
      <Typography.Title tag="h1" className={s.title}>
        {t('user.single.title')}
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
                {watchedStatus
                  ? t('user.new.form.statusActive')
                  : t('user.new.form.statusInActive')}
              </Typography.Text>
              <FormField size="m" className={s.switcher}>
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
              {isLastNameEdit ? (
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
                          rightAddons={
                            <SuccesButton
                              onClick={() => onSuccess('isLastNameEdit')}
                            />
                          }
                        />
                      );
                    }}
                  />
                </FormField>
              ) : (
                <UserItem
                  value={userData?.lastName}
                  title={t('user.new.form.lastName')}
                  onEdit={() => {
                    onEdit('isLastNameEdit');
                  }}
                />
              )}
            </Grid.Col>
            <Grid.Col
              width={{
                mobile: { s: 12, m: 12, l: 12 },
                tablet: { s: 12, m: 8, l: 8 },
                desktop: { s: 7, m: 7, l: 7 }
              }}
            >
              {isFirstNameEdit ? (
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
                          rightAddons={
                            <SuccesButton
                              onClick={() => onSuccess('isFirstNameEdit')}
                            />
                          }
                        />
                      );
                    }}
                  />
                </FormField>
              ) : (
                <UserItem
                  value={userData?.firstName}
                  title={t('user.new.form.firstName')}
                  onEdit={() => {
                    onEdit('isFirstNameEdit');
                  }}
                />
              )}
            </Grid.Col>
            <Grid.Col
              width={{
                mobile: { s: 12, m: 12, l: 12 },
                tablet: { s: 12, m: 8, l: 8 },
                desktop: { s: 7, m: 7, l: 7 }
              }}
            >
              {isMiddleNameEdit ? (
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
                          rightAddons={
                            <SuccesButton
                              onClick={() => onSuccess('isMiddleNameEdit')}
                            />
                          }
                        />
                      );
                    }}
                  />
                </FormField>
              ) : (
                <UserItem
                  value={userData?.middleName}
                  title={t('user.new.form.middleName')}
                  onEdit={() => {
                    onEdit('isMiddleNameEdit');
                  }}
                />
              )}
            </Grid.Col>
            <Grid.Col
              width={{
                mobile: { s: 12, m: 12, l: 12 },
                tablet: { s: 12, m: 8, l: 8 },
                desktop: { s: 7, m: 7, l: 7 }
              }}
            >
              {isPhoneNumberEdit ? (
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
                          rightAddons={
                            <SuccesButton
                              onClick={() => onSuccess('isPhoneNumberEdit')}
                            />
                          }
                        />
                      );
                    }}
                  />
                </FormField>
              ) : (
                <UserItem
                  value={userData?.phoneNumber}
                  title={t('user.new.form.phoneNumber')}
                  onEdit={() => {
                    onEdit('isPhoneNumberEdit');
                  }}
                />
              )}
            </Grid.Col>
            <Grid.Col
              width={{
                mobile: { s: 12, m: 12, l: 12 },
                tablet: { s: 12, m: 8, l: 8 },
                desktop: { s: 7, m: 7, l: 7 }
              }}
            >
              {isEmailEdit ? (
                <FormField size="m">
                  <Controller
                    name="login"
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
                          rightAddons={
                            <SuccesButton
                              onClick={() => onSuccess('isEmailEdit')}
                            />
                          }
                        />
                      );
                    }}
                  />
                </FormField>
              ) : (
                <UserItem
                  value={userData?.login}
                  title={t('user.new.form.email')}
                  onEdit={() => {
                    onEdit('isEmailEdit');
                  }}
                />
              )}
            </Grid.Col>
            <Grid.Col
              width={{
                mobile: { s: 12, m: 12, l: 12 },
                tablet: { s: 12, m: 8, l: 8 },
                desktop: { s: 7, m: 7, l: 7 }
              }}
            >
              {isRoleEdit ? (
                <FormField size="m">
                  <Controller
                    name="role"
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => {
                      return (
                        <Select
                          size="m"
                          width="available"
                          className={s.roleTitle}
                          label={t('user.new.form.role')}
                          mode="radio"
                          onBlur={onBlur}
                          value={value}
                          onChange={role => {
                            onChange(role);
                            onSuccess('isRoleEdit');
                          }}
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
                        />
                      );
                    }}
                  />
                </FormField>
              ) : (
                <UserItem
                  value={userData?.role}
                  title={t('user.new.form.role')}
                  onEdit={() => {
                    onEdit('isRoleEdit');
                  }}
                />
              )}
            </Grid.Col>
          </Grid.Row>
        </form>
      </div>
    </div>
  );
};
