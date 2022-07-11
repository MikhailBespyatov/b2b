import React, { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import Button from 'arui-feather/button';
import { Checkbox } from '@alfalab/core-components/checkbox';
import { Spinner } from '@alfalab/core-components/spinner';
import {
  useGetPartnerQuery,
  useUpdatePartnerMutation
} from '../../../services/api/partnerApi';
import { addToast } from '../../../redux/slices/app-slice';
import { uuid } from '../../../utils/uuid';
import GeneralInfo from '../../Partners/partials/GeneralInfo';
import LegalAddress from '../../Partners/partials/LegalAddress';
import MailingAddress from '../../Partners/partials/MailingAdress';
import {
  useGetCitiesQuery,
  useGetCountriesQuery
} from '../../../services/api/countryApi';
import { ICountry } from '../../../models/ICountry';
import { ICity } from '../../../models/ICity';
import { PARTNERS } from '../../../navigation/CONSTANTS';

type PropsType = {
  merchantId: string;
};

const Information: FC<PropsType> = ({ merchantId }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [countAddress, setCountAddress] = useState<number>(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { data: countryData } = useGetCountriesQuery('', {
    selectFromResult: ({ data, ...rest }) => {
      const newData = data?.map((item: ICountry) => {
        return {
          value: item[`${i18n.language.toUpperCase() as 'RU' | 'KZ'}Name`],
          text: item[`${i18n.language.toUpperCase() as 'RU' | 'KZ'}Name`]
        };
      });
      return {
        data: newData,
        ...rest
      };
    }
  });
  const { data: cityData } = useGetCitiesQuery('', {
    selectFromResult: ({ data, ...rest }) => {
      const newData = data?.map((item: ICity) => {
        return {
          text: item[`${i18n.language.toUpperCase() as 'RU' | 'KZ'}Name`],
          value: item[`${i18n.language.toUpperCase() as 'RU' | 'KZ'}Name`]
        };
      });

      return {
        data: newData,
        ...rest
      };
    }
  });

  const {
    data,
    isError,
    isFetching: isMerchantLoading
  } = useGetPartnerQuery(merchantId);
  const [updatePartner, { isLoading, isSuccess }] = useUpdatePartnerMutation();

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      legalEntityForm: '',
      partnerLegalName: '',
      bin: '',
      merchantId: '',
      pointCode: '',
      mSite: '',
      phoneNumber: '',
      archivePassword: '',
      Adresses: [
        {
          type: 'juridical',
          country: '',
          city: '',
          postIndex: '',
          street: '',
          house: '',
          flat: '',
          okato: ''
        }
      ]
    }
  });

  useEffect(() => {
    if (data) {
      reset({
        bin: data?.bin,
        partnerLegalName: data?.partnerLegalName,
        mSite: data?.partnerWebsite
      });
    }
  }, [data, reset]);

  const onSubmit = handleSubmit((values: any) => {
    updatePartner({ ...values, merchantId })
      .then(({ error }: any) => {
        if (error) {
          dispatch(
            addToast({
              id: uuid(),
              badge: 'negative',
              text: error?.data?.errorMessage,
              title: ''
            })
          );
        } else {
          setIsButtonDisabled(true);
          dispatch(
            addToast({
              id: uuid(),
              badge: 'positive',
              text: t('partner.update-partner.success'),
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

  const handleIsAddressMatchChange = () => {
    setCountAddress((prev: number) => (prev !== 0 ? 0 : prev + 1));
    setIsButtonDisabled(false);
  };

  const handleAddAddress = () => {
    setCountAddress(prev => prev + 1);
  };

  const generalInfoMemo = useMemo(() => {
    return (
      <GeneralInfo
        control={control}
        isButtonDisabled={isButtonDisabled}
        setIsButtonDisabled={setIsButtonDisabled}
        isEditable
      />
    );
  }, [control]);

  const legalAddressMemo = useMemo(() => {
    if (countryData && cityData) {
      return (
        <LegalAddress
          countryList={countryData}
          cityList={cityData}
          control={control}
          errors={errors?.Adresses?.[0] ?? false}
          isButtonDisabled={isButtonDisabled}
          setIsButtonDisabled={setIsButtonDisabled}
          isEditable
        />
      );
    }
    return null;
  }, [countryData, cityData, control, errors?.Adresses]);

  if (isError) {
    return <Navigate to={PARTNERS} />;
  }

  if (isMerchantLoading) {
    return (
      <div className="absolute-center">
        <Spinner visible size="m" />
      </div>
    );
  }

  return (
    <form key={`${isSuccess}`} onSubmit={onSubmit} className="mt-24 mb-24">
      {generalInfoMemo}
      {legalAddressMemo}
      <div className="mb-34">
        <Checkbox
          label={t('partner.new.form.legal.matchEmail')}
          onChange={handleIsAddressMatchChange}
          checked={!countAddress}
        />
      </div>
      {!!countAddress && (
        <>
          {countryData &&
            cityData &&
            Array.from({ length: countAddress }, (_, index) => {
              return (
                <Fragment key={index + 1}>
                  <input
                    type="hidden"
                    value="postal"
                    {...register(`Adresses.${index + 1}.type`)}
                  />
                  <MailingAddress
                    counter={index + 1}
                    control={control}
                    countryList={countryData ?? []}
                    cityList={cityData ?? []}
                    errors={errors?.Adresses?.[index + 1] ?? false}
                  />
                </Fragment>
              );
            })}
          <div className="mt-24 mb-34">
            <Button size="s" onClick={handleAddAddress}>
              + {t('partner.address.add')}
            </Button>
          </div>
        </>
      )}
      <Button
        view="extra"
        size="m"
        type="submit"
        className="mb-32"
        disabled={isLoading || isButtonDisabled}
        icon={isLoading && <Spinner visible />}
      >
        {t('button.save')}
      </Button>
    </form>
  );
};

export default Information;
