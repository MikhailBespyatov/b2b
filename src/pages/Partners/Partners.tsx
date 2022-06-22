import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Select from 'arui-feather/select';
import Button from 'arui-feather/button';
import { Typography } from '@alfalab/core-components/typography';
import { Checkbox } from '@alfalab/core-components/checkbox';
import { Pagination } from '@alfalab/core-components/pagination';
import { Switch } from '@alfalab/core-components/switch';
import { SETTINGS } from 'navigation/CONSTANTS';

const Partners: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [limit, setLimit] = useState(25);
  const [search, setSearch] = useSearchParams();

  const partners = [
    {
      id: 1,
      name: 'АО “Аленушкины сказки”',
      code: 1,
      bin: 'bin',
      pointCode: '2',
      city: 'ala',
      status: 'active'
    }
  ];

  const handlePageChange = (value: number) => {
    setSearch(`?page=${value + 1}`);
  };

  const handleSelect =
    (id: number) =>
    (_: unknown, { checked }: any) => {
      if (checked) {
        setCheckedItems((prev: number[]) => [...prev, id]);
      } else {
        setCheckedItems((prev: number[]) => [
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
            {partners.map((el: any) => {
              return (
                <tr key={el.id} className="c-pointer">
                  <td>
                    <Checkbox
                      onChange={handleSelect(el.id)}
                      checked={checkedItems.includes(el.id)}
                    />
                  </td>
                  <td>{el.name}</td>
                  <td>{el.code}</td>
                  <td>{el.bin}</td>
                  <td>{el.pointCode}</td>
                  <td>{el.city}</td>
                  <td>{el.status}</td>
                  <td>
                    <Switch
                      checked={el.status === 'active'}
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
