import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'arui-feather/button';
import { Checkbox } from '@alfalab/core-components/checkbox';
import { Typography } from '@alfalab/core-components/typography';

import GeneralInfo from './partials/GeneralInfo';
import LegalAddress from './partials/LegalAddress';
import MailingAddress from './partials/MailingAdress';

const NewPartner: FC = () => {
  const { t } = useTranslation();
  const [countAddress, setCountAddress] = useState<number>(0);

  const handleIsAddressMatchChange = () => {
    setCountAddress((prev: number) => (prev !== 0 ? 0 : prev + 1));
  };

  const handleAddAddress = () => {
    setCountAddress(prev => prev + 1);
  };

  const generalInfoMemo = useMemo(() => {
    return <GeneralInfo />;
  }, []);

  const legalAddressMemo = useMemo(() => {
    return <LegalAddress />;
  }, []);

  return (
    <>
      <div className="mb-32 d-flex mobile-block">
        <Typography.Title tag="h2" className="mr-24">
          {t('partner.new.header.title')}
        </Typography.Title>
      </div>
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
          {Array.from({ length: countAddress }, (_, index) => {
            return <MailingAddress key={index} />;
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
    </>
  );
};

export default NewPartner;
