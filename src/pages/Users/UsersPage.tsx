import { Button } from '@alfalab/core-components/button';
import { Typography } from '@alfalab/core-components/typography';
import { Pagination } from 'components/Pagination';
import { Table } from 'components/Table';
import { USERS } from 'navigation/CONSTANTS';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetUsersQuery } from 'services/api/usersApi';
import { tHeadItems } from './constants';
import { DataType, TableType } from './types';
import s from './Users.module.css';

const UsersPage: FC = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetUsersQuery('');
  const [checkedItems] = useState<Array<number | string>>([]);
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const [limit, setLimit] = useState(25);

  const currentPageIndex = (Number(search.get('page')) || 1) - 1;
  const pagesCount = (data && Math.ceil(data.length / limit)) || 1;

  const onSelect = (values: number[] | undefined) => {
    if (values) {
      setLimit(values?.[0] ?? 25);
      setSearch('?page=1');
    }
  };

  const onPageChange = (value: number) => {
    setSearch(`?page=${value + 1}`);
  };

  const selectOptions = [
    {
      text: t('table.perPage', { size: 25 }),
      value: 25
    },
    {
      text: t('table.perPage', { size: 20 }),
      value: 20
    }
  ];

  const tableData = data?.map(
    ({
      userLastname,
      userName,
      merchantId,
      userLogin,
      role,
      jobTitle
    }: DataType): TableType => {
      return {
        checkbox: <input type="checkbox" />,
        fullName: `${userLastname} ${userName}`,
        merchantId,
        userLogin,
        role,
        jobTitle
      };
    }
  );

  return (
    <div>
      <div>
        <Typography.Title tag="h1" className={s.title}>
          {t('users.header.title')}
        </Typography.Title>
        <div className={s.buttons_wrapper}>
          <Button view="primary" size="xs" onClick={() => navigate(USERS)}>
            {t('users.button.addUser')}
          </Button>
          {checkedItems.length !== 0 && (
            <Button size="xs">{t('button.delete')}</Button>
          )}
        </div>
        <Table
          tHeadItems={tHeadItems}
          data={tableData}
          isFetching={isFetching}
          limit={limit}
        />
      </div>
      <div>
        <Pagination
          onPageChange={onPageChange}
          currentPageIndex={currentPageIndex}
          selectOptions={selectOptions}
          pagesCount={pagesCount}
          onSelect={onSelect}
          limit={[limit]}
        />
      </div>
    </div>
  );
};

export default UsersPage;
