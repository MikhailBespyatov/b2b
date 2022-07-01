import React, { FC, useMemo, useState } from 'react';
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

const NewPartner: FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [countAddress, setCountAddress] = useState<number>(0);
  const [formDefaultValues, setFormDefaultValues] = useState<any>({
    legalEntityForm: 'TOO',
    partnerLegalName: 'AO KONY',
    bin: '87984455521',
    merchantId: '',
    pointCode: '01-LT-KOEN',
    mSite: 'konepushka.kz',
    phoneNumber: '+77472214849',
    archivePassword: '1488',
    Adresses: [
      {
        type: 'juridical',
        country: 'Kazakhstan',
        city: 'Karaganda',
        postIndex: 'MX1200',
        street: 'Konayev',
        house: '12',
        flat: '3',
        okato: '12345'
      }
    ]
  });
  const [postPartner, { isLoading }] = usePostPartnerMutation();

  const { data: countryData, isFetching: isCountryDataFetching } =
    useGetCountriesQuery('', {
      selectFromResult: ({ data, ...rest }) => {
        const newData = data?.map(item => {
          return {
            value: item.id,
            // @ts-ignore
            text: item[`${i18n.language.toUpperCase()}Name`]
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
        const newData = data?.map(item => {
          return {
            value: item.id,
            // @ts-ignore
            text: item[`${i18n.language.toUpperCase()}Name`]
          };
        });

        return {
          data: newData,
          ...rest
        };
      }
    }
  );

  const { handleSubmit, control } = useForm({
    defaultValues: formDefaultValues
  });

  const onSubmit = handleSubmit((values: any) => {
    postPartner({ ...values, merchantId: uuid().substr(-8, 8) })
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
          dispatch(
            addToast({
              id: uuid(),
              badge: 'positive',
              text: 'Партнер успешно добавлен',
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
            text: 'Ошибка',
            title: ''
          })
        );
      });
  });

  const generateFormFields = () => {
    const mailingAddress: any[] = [];
    for (let i = 0; i < countAddress + 1; i += 1) {
      mailingAddress.push({
        type: 'postal',
        country: undefined,
        city: undefined,
        postIndex: '',
        street: '',
        house: '',
        flat: '',
        okato: ''
      });
    }
    setFormDefaultValues((prev: any) => ({
      ...prev,
      Adresses: [...prev.Adresses, ...mailingAddress]
    }));
  };

  const handleIsAddressMatchChange = () => {
    if (countAddress === 0) {
      generateFormFields();
    } else {
      setFormDefaultValues((prev: any) => ({
        ...prev,
        Adresses: prev.Adresses[0]
      }));
    }

    setCountAddress((prev: number) => (prev !== 0 ? 0 : prev + 1));
  };

  const handleAddAddress = () => {
    generateFormFields();
    setCountAddress(prev => prev + 1);
  };

  const generalInfoMemo = useMemo(() => {
    return <GeneralInfo control={control} />;
  }, [control]);

  const legalAddressMemo = useMemo(() => {
    if (countryData && cityData) {
      return (
        <LegalAddress
          countryList={countryData}
          cityList={cityData}
          control={control}
        />
      );
    }
    return null;
  }, [countryData, cityData, control]);

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
                  <MailingAddress
                    key={index}
                    counter={index + 1}
                    control={control}
                    countryList={countryData}
                    cityList={cityData}
                  />
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
