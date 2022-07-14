import React, { FC, Fragment, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import Button from 'arui-feather/button';
import { Checkbox } from '@alfalab/core-components/checkbox';
import { Typography } from '@alfalab/core-components/typography';
import { Spinner } from '@alfalab/core-components/spinner';

import GeneralInfo from './partials/GeneralInfo';
import LegalAddress from './partials/LegalAddress';
import MailingAddress from './partials/MailingAdress';
import {
  useGetCitiesQuery,
  useGetCountriesQuery
} from '../../services/api/countryApi';
import { usePostPartnerMutation } from '../../services/api/partnerApi';
import { addToast } from '../../redux/slices/app-slice';
import { uuid } from '../../utils/uuid';
import { ICity } from '../../models/ICity';
import { ICountry } from '../../models/ICountry';

const NewPartner: FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [countAddress, setCountAddress] = useState<number>(0);
  const [postPartner, { isLoading }] = usePostPartnerMutation();

  const { data: countryData, isFetching: isCountryDataFetching } =
    useGetCountriesQuery('', {
      selectFromResult: ({ data, ...rest }) => {
        const newData = data?.map((item: ICountry) => {
          return {
            text: item[`${i18n.language.toUpperCase() as 'RU' | 'KZ'}Name`],
            value: item.id?.toString()
          };
        });
        return {
          data: newData,
          ...rest
        };
      }
    });
  const { data: cityData, isFetching: isCityDataFetching } = useGetCitiesQuery(
    '',
    {
      selectFromResult: ({ data, ...rest }) => {
        const newData = data?.map((item: ICity) => {
          return {
            text: item[`${i18n.language.toUpperCase() as 'RU' | 'KZ'}Name`],
            value: item.id?.toString()
            // value: item[`${i18n.language.toUpperCase() as 'RU' | 'KZ'}Name`]
          };
        });

        return {
          data: newData,
          ...rest
        };
      }
    }
  );

  const {
    handleSubmit,
    control,
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

  const onSubmit = handleSubmit((values: any) => {
    postPartner({
      ...values,
      Adresses: values.Adresses.map((address: any, index: number) => {
        if (index === 0) {
          return {
            ...address,
            type: 'juridical',
            country: countryData ? countryData[0].value : ''
          };
        }
        return {
          ...address,
          type: 'postal',
          country: countryData ? countryData[0].value : ''
        };
      }),
      merchantId: uuid().substr(-8, 8)
    })
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
          reset({
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
          });
          setCountAddress(0);
          dispatch(
            addToast({
              id: uuid(),
              badge: 'positive',
              text: t('partner.new-partner.success'),
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
  };

  const handleAddAddress = () => {
    setCountAddress(prev => prev + 1);
  };

  const generalInfoMemo = useMemo(() => {
    return <GeneralInfo control={control} />;
  }, [control]);

  const legalAddressMemo = useMemo(() => {
    if (countryData && cityData) {
      return (
        <LegalAddress
          cityList={cityData}
          control={control}
          errors={errors?.Adresses?.[0] ?? false}
        />
      );
    }
    return null;
  }, [countryData, cityData, control, errors?.Adresses]);

  if (isCountryDataFetching || isCityDataFetching) {
    return (
      <div className="flex-center mh-90">
        <Spinner visible size="m" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-32 d-flex mobile-block">
        <Typography.Title tag="h2" className="mr-24">
          {t('partner.new.header.title')}
        </Typography.Title>
      </div>
      <form onSubmit={onSubmit} className="mt-24 mb-24">
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
                    <MailingAddress
                      counter={index + 1}
                      control={control}
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
          disabled={isLoading}
          icon={isLoading && <Spinner visible />}
        >
          {t('button.save')}
        </Button>
      </form>
    </>
  );
};

export default NewPartner;
