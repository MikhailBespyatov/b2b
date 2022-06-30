import React, { FC, useMemo, useState } from 'react';
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

const NewPartner: FC = () => {
  const { t, i18n } = useTranslation();
  const [countAddress, setCountAddress] = useState<number>(0);
  const [postPartner] = usePostPartnerMutation();
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
    defaultValues: {
      legalEntityForm: undefined,
      partnerLegalName: undefined,
      bin: undefined,
      mSite: '',
      pointCode: '',
      phoneNumber: '',
      archivePassword: '',
      Adresses: []
    }
  });

  const onSubmit = handleSubmit((values: any) => {
    postPartner(values);
    console.log(values);
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
      return <LegalAddress countryList={countryData} cityList={cityData} />;
    }
    return null;
  }, [countryData, cityData]);

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
        <Button view="extra" size="m" type="submit" className="mb-32">
          {t('button.save')}
        </Button>
      </form>
    </>
  );
};

export default NewPartner;
