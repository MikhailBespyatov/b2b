import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid } from '@alfalab/core-components/grid';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Label } from 'arui-feather/label';
import PhoneInput from 'arui-feather/phone-input';
import FormField from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import Select from 'arui-feather/select';
import { PencilIcon } from '../../../components/ui/icons/Pencil';

type PropsType = {
  control: Control<any>;
  isEditable?: boolean;
  isButtonDisabled?: boolean;
  setIsButtonDisabled?: Dispatch<SetStateAction<boolean>>;
};
const EditIcon = () => <PencilIcon width={16} height={16} />;

const GeneralInfo: FC<PropsType> = ({
  control,
  isEditable,
  isButtonDisabled,
  setIsButtonDisabled
}) => {
  const { t } = useTranslation();
  const [disabledFields, setDisabledFields] = useState({
    partnerLegalName: isEditable,
    legalEntityForm: isEditable,
    bin: isEditable,
    mSite: isEditable,
    pointCode: isEditable,
    phoneNumber: isEditable,
    archivePassword: isEditable
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
        {t('partner.new.header.general')}
      </Label>
      <Grid.Row className="container mb-24 mt-16">
        <Grid.Col
          width={{
            mobile: { s: 12, m: 12, l: 12 },
            tablet: { s: 12, m: 8, l: 8 },
            desktop: { s: 7, m: 7, l: 7 }
          }}
        >
          <FormField size="s">
            <Controller
              name="partnerLegalName"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    size="s"
                    label={t('partner.new.form.general.legalName')}
                    width="available"
                    hint={t('hint.withoutQuotes')}
                    disabled={disabledFields.partnerLegalName}
                    rightAddons={
                      disabledFields.partnerLegalName && (
                        <IconButton
                          size="xxs"
                          onClick={handleEdit('partnerLegalName')}
                          icon={EditIcon}
                        />
                      )
                    }
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
              name="legalEntityForm"
              control={control}
              render={({ field: { value, onChange } }) => {
                if (disabledFields.legalEntityForm) {
                  return (
                    <Input
                      size="s"
                      label={t('partner.new.form.general.entityForm')}
                      width="available"
                      disabled={disabledFields.legalEntityForm}
                      rightAddons={
                        <IconButton
                          size="xxs"
                          onClick={handleEdit('legalEntityForm')}
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
                    label={t('partner.new.form.general.entityForm')}
                    mode="radio"
                    options={[
                      {
                        value: '',
                        text: 'Не выбран'
                      },
                      {
                        value: 'TOO',
                        text: 'ТОО'
                      },
                      {
                        value: 'OAO',
                        text: 'ОАО'
                      },
                      {
                        value: 'ZAO',
                        text: 'ЗАО'
                      }
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
              name="bin"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    size="s"
                    label={t('partner.new.form.general.bin')}
                    width="available"
                    disabled={disabledFields.bin}
                    rightAddons={
                      disabledFields.bin && (
                        <IconButton
                          size="xxs"
                          onClick={handleEdit('bin')}
                          icon={EditIcon}
                        />
                      )
                    }
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
              name="mSite"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    size="s"
                    label={t('partner.new.form.general.website')}
                    width="available"
                    disabled={disabledFields.mSite}
                    rightAddons={
                      disabledFields.mSite && (
                        <IconButton
                          size="xxs"
                          onClick={handleEdit('mSite')}
                          icon={EditIcon}
                        />
                      )
                    }
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
              name="pointCode"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    size="s"
                    label={t('partner.new.form.general.ukkNumber')}
                    width="available"
                    hint={t('hint.ukkNumber')}
                    disabled={disabledFields.pointCode}
                    rightAddons={
                      disabledFields.pointCode && (
                        <IconButton
                          size="xxs"
                          onClick={handleEdit('pointCode')}
                          icon={EditIcon}
                        />
                      )
                    }
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
                    disabled={disabledFields.phoneNumber}
                    rightAddons={
                      disabledFields.phoneNumber && (
                        <IconButton
                          size="xxs"
                          onClick={handleEdit('phoneNumber')}
                          icon={EditIcon}
                        />
                      )
                    }
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
              name="archivePassword"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    size="s"
                    label={t('partner.new.form.general.archiveCode')}
                    width="available"
                    hint={t('hint.ukkDB')}
                    disabled={disabledFields.archivePassword}
                    rightAddons={
                      disabledFields.archivePassword && (
                        <IconButton
                          size="xxs"
                          onClick={handleEdit('archivePassword')}
                          icon={EditIcon}
                        />
                      )
                    }
                    {...field}
                  />
                );
              }}
            />
          </FormField>
        </Grid.Col>
      </Grid.Row>
    </>
  );
};

GeneralInfo.defaultProps = {
  isEditable: false,
  isButtonDisabled: true,
  setIsButtonDisabled: () => null
};

export default GeneralInfo;
