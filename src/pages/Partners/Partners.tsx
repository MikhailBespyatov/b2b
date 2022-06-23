import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Select from 'arui-feather/select';
import Button from 'arui-feather/button';
import { Typography } from '@alfalab/core-components/typography';
import { Checkbox } from '@alfalab/core-components/checkbox';
import { Pagination } from '@alfalab/core-components/pagination';
import { Switch } from '@alfalab/core-components/switch';
import { Skeleton } from '@alfalab/core-components/skeleton';

import { SETTINGS } from 'navigation/CONSTANTS';
import { useGetMerchantsQuery } from 'services/api/transactionAPI';
import { uuid } from 'utils/uuid';
import { IMerchant } from 'models/IMerchant';

const Partners: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<Array<number | string>>([]);
  const [limit, setLimit] = useState(25);
  const [search, setSearch] = useSearchParams();
  const { data, isSuccess, isFetching } = useGetMerchantsQuery('');

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

  const handleSwitch = () => {
    console.log();
  };

  return (
    <>
      <div className="mb-32 d-flex mobile-block">
        <Typography.Title tag="h2" className="mr-24">
          {t('partner.header.title')}
        </Typography.Title>
      </div>
      {checkedItems.length ? (
        <Button size="m" className="mb-24">
          {t('button.delete')}
        </Button>
      ) : (
        <Button
          view="extra"
          size="m"
          className="mb-24"
          onClick={() => navigate(SETTINGS)}
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
                  <tr key={item.merchantId} className="c-pointer">
                    <td>
                      <Checkbox
                        onChange={handleSelect(item.merchantId)}
                        checked={checkedItems.includes(item.merchantId)}
                      />
                    </td>
                    <td>{item.merchantId}</td>
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

        <div className="mb-20">
          <div className="table-pagination">
            <Select
              mode="radio"
              className="mobile-block"
              options={[
                {
                  text: t('table.perPage', { size: 25 }),
                  value: 25
                },
                {
                  text: t('table.perPage', { size: 20 }),
                  value: 20
                }
              ]}
              value={[limit]}
              onChange={(values: number[] | undefined) => {
                if (values) {
                  setLimit(values?.[0] ?? 25);
                  setSearch('?page=1');
                }
              }}
            />
            <Pagination
              currentPageIndex={(Number(search.get('page')) || 1) - 1}
              pagesCount={1}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Partners;
