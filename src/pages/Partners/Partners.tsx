import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from 'arui-feather/button';
import { Typography } from '@alfalab/core-components/typography';
import { Checkbox } from '@alfalab/core-components/checkbox';
import { Skeleton } from '@alfalab/core-components/skeleton';
import { Switch } from '@alfalab/core-components/switch';
import { PARTNERS, NEW_PARTNER } from 'navigation/CONSTANTS';
import { uuid } from 'utils/uuid';
import { IMerchant } from 'models/IMerchant';
import { Pagination } from 'components/Pagination';
import { PartnerPage } from '../Partner';
import { useGetPartnersQuery } from '../../services/api/partnerApi';

const Partners: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<Array<number | string>>([]);
  const [limit, setLimit] = useState(25);
  const [search, setSearch] = useSearchParams();
  const { data, isSuccess, isFetching } = useGetPartnersQuery('');

  const handlePageChange = (value: number) => {
    setSearch(`?page=${value + 1}`);
  };

  const handleSelect =
    (id: string | number) =>
    (_: unknown, { checked }: any) => {
      if (checked) {
        setCheckedItems((prev: Array<number | string>) => [...prev, id]);
      } else {
        setCheckedItems((prev: Array<number | string>) => [
          ...prev.filter(prev2 => prev2 !== id)
        ]);
      }
    };

  const handleSwitch = (e: any) => {
    e.stopPropagation();
  };

  return (
    <>
      <Typography.Title tag="h1" className="title-1 mb-42">
        {t('partner.header.title')}
      </Typography.Title>
      {checkedItems.length ? (
        <Button size="m" className="mb-24">
          {t('button.delete')}
        </Button>
      ) : (
        <Button
          view="extra"
          size="m"
          className="mb-24"
          onClick={() => navigate(PARTNERS + NEW_PARTNER)}
        >
          {t('partner.button.addPartner')}
        </Button>
      )}

      <div className="overflowX mb-24">
        <table className="table">
          <thead>
            <tr>
              <td> </td>
              <td>
                <div>{t('partner.table.companyName')}</div>
              </td>
              <td>
                <div>{t('partner.table.partnerCode')}</div>
              </td>
              <td>
                <div>{t('partner.table.bin')}</div>
              </td>
              <td>
                <div>{t('partner.table.pointCode')}</div>
              </td>
              <td>{t('partner.table.city')}</td>
              <td>{t('partner.table.status')}</td>
              <td> </td>
            </tr>
          </thead>
          <tbody>
            {isFetching &&
              Array.from({ length: limit }, (_, index) => {
                return (
                  <tr key={index}>
                    {Array.from({ length: 8 }, () => {
                      return (
                        <td key={uuid()}>
                          <Skeleton visible animate>
                            -
                          </Skeleton>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            {isSuccess &&
              Array.isArray(data) &&
              data.map((item: IMerchant) => {
                return (
                  <tr key={item.merchantId}>
                    <td>
                      <Checkbox
                        onChange={handleSelect(item.merchantId)}
                        checked={checkedItems.includes(item.merchantId)}
                      />
                    </td>
                    <td>
                      <Link
                        to={`${PARTNERS}?id=${item.merchantId}`}
                        className="primary-color"
                      >
                        {item.merchantId}
                      </Link>
                    </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td>{item.merchantId}</td>
                    <td>
                      <Switch
                        checked={item.merchantId === 'active'}
                        onChange={handleSwitch}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <Pagination
          onPageChange={handlePageChange}
          currentPageIndex={(Number(search.get('page')) || 1) - 1}
          pagesCount={1}
          onSelect={(values: number[] | undefined) => {
            if (values) {
              setLimit(values?.[0] ?? 25);
              setSearch('?page=1');
            }
          }}
          limit={[limit]}
          selectOptions={[
            {
              text: t('table.perPage', { size: 25 }),
              value: 25
            },
            {
              text: t('table.perPage', { size: 20 }),
              value: 20
            }
          ]}
        />
      </div>
    </>
  );
};

const PartnersWrapper: FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  if (id) {
    return <PartnerPage merchantId={id} />;
  }

  return <Partners />;
};

export default PartnersWrapper;
