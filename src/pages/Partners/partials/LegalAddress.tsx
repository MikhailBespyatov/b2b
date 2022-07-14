import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Label } from 'arui-feather/label';
import FormField from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import Select from 'arui-feather/select';
import { Grid } from '@alfalab/core-components/grid';
import { IconButton } from '@alfalab/core-components/icon-button';

import { ISelect } from '../../../models/ISelect';
import { PencilIcon } from '../../../components/ui/icons/Pencil';

const EditIcon = () => <PencilIcon width={16} height={16} />;

type PropsType = {
  cityList: ISelect[];
  control: Control<any>;
  errors: any;
  isEditable?: boolean;
  isButtonDisabled?: boolean;
  setIsButtonDisabled?: Dispatch<SetStateAction<boolean>>;
};

const LegalAddress: FC<PropsType> = ({
  cityList,
  control,
  isEditable,
  isButtonDisabled,
  setIsButtonDisabled,
  errors
}) => {
  const { t } = useTranslation();

  const [disabledFields, setDisabledFields] = useState({
    city: isEditable,
    postIndex: isEditable,
    street: isEditable,
    house: isEditable,
    flat: isEditable,
    okato: isEditable
  });

  const handleEdit = (fieldName: string) => () => {
    setDisabledFields(prev => ({ ...prev, [fieldName]: false }));

    if (isButtonDisabled && setIsButtonDisabled) {
      setIsButtonDisabled(false);
    }
  };

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
              name="Adresses[0].city"
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { value, onChange } }) => {
                if (disabledFields.city) {
                  return (
                    <Input
                      size="s"
                      label={t('partner.new.form.legal.city')}
                      width="available"
                      disabled={disabledFields.city}
                      error={!!errors?.city}
                      rightAddons={
                        <IconButton
                          size="xxs"
                          onClick={handleEdit('city')}
                          icon={EditIcon}
                        />
                      }
                      value={value}
                    />
                  );
                }

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
                    error={!!errors?.city}
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
            rules={{
              required: true
            }}
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
                    <div className="t-right">{field.value?.length}/120</div>
                  }
                  disabled={disabledFields.postIndex}
                  rightAddons={
                    disabledFields.postIndex && (
                      <IconButton
                        size="xxs"
                        onClick={handleEdit('postIndex')}
                        icon={EditIcon}
                      />
                    )
                  }
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
                  disabled={disabledFields.street}
                  rightAddons={
                    disabledFields.street && (
                      <IconButton
                        size="xxs"
                        onClick={handleEdit('street')}
                        icon={EditIcon}
                      />
                    )
                  }
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
            rules={{
              required: true
            }}
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
                    <div className="t-right">{field.value?.length}/120</div>
                  }
                  disabled={disabledFields.house}
                  rightAddons={
                    disabledFields.house && (
                      <IconButton
                        size="xxs"
                        onClick={handleEdit('house')}
                        icon={EditIcon}
                      />
                    )
                  }
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
                  disabled={disabledFields.flat}
                  rightAddons={
                    disabledFields.flat && (
                      <IconButton
                        size="xxs"
                        onClick={handleEdit('flat')}
                        icon={EditIcon}
                      />
                    )
                  }
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
                  disabled={disabledFields.okato}
                  rightAddons={
                    disabledFields.okato && (
                      <IconButton
                        size="xxs"
                        onClick={handleEdit('okato')}
                        icon={EditIcon}
                      />
                    )
                  }
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

LegalAddress.defaultProps = {
  isEditable: false,
  isButtonDisabled: true,
  setIsButtonDisabled: () => null
};

export default LegalAddress;
