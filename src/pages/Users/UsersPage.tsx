import React, { FC, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import Button from 'arui-feather/button';
import { Typography } from '@alfalab/core-components/typography';
import { Pagination } from 'components/Pagination';
import { Table } from 'components/Table';
import { IColumn } from 'components/Table/types';
import { NEW_USER, USERS } from 'navigation/CONSTANTS';
import { useGetUsersQuery } from 'services/api/usersApi';
import { Checkbox } from '@alfalab/core-components/checkbox';
import { objectClear } from 'utils/objectClear';
import { Filter } from './partials/Filter';

import { DataType } from './types';
import s from './Users.module.css';

type PropsType = {
  title?: string | undefined;
  merchantId?: string | undefined;
};

const UsersPage: FC<PropsType> = ({ title, merchantId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const [checkedItems] = useState<Array<number | string>>([]);
  const [limit, setLimit] = useState(25);
  const [selectedItems, setSelectedItems] = useState<Array<string | number>>(
    []
  );
  const [queryParams, setQueryParams] = useState({
    fullName: '',
    login: '',
    registeredAt: '',
    merchantId: '',
    role: '',
    registeredByFIO: ''
  });

  const { data, isFetching } = useGetUsersQuery({
    ...objectClear(queryParams)
  });

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

  const handleSelect =
    (selectedId: string | number) => (_: unknown, checkbox: any) => {
      if (checkbox.checked) {
        setSelectedItems(prev => [...prev, selectedId]);
      } else {
        setSelectedItems(prev => [
          ...prev.filter(prevId => prevId !== selectedId)
        ]);
      }
    };

  const columns: IColumn[] = [
    {
      title: '',
      grid: 0.3,
      dataIndex: 'id',
      key: 'id',
      render: (value: string) => {
        return (
          <Checkbox
            onChange={handleSelect(value)}
            checked={selectedItems.includes(value)}
          />
        );
      }
    },
    {
      title: t('users.table.header.fullName'),
      dataIndex: 'firstName',
      key: 'firstName',
      grid: 1.5,
      render: (value: string, record: DataType) => {
        return `${record.lastName} ${value} ${record.middleName}`;
      }
    },
    {
      title: t('users.table.header.partner'),
      dataIndex: 'merchantId',
      key: 'merchantId'
    },
    {
      title: t('users.table.header.email'),
      dataIndex: 'login',
      key: 'login'
    },
    {
      title: t('users.table.header.role'),
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: t('users.table.header.dateOfRegistration'),
      dataIndex: 'registeredAt',
      key: 'registeredAt',
      render: (value: string) => {
        return format(new Date(value), 'dd.MM.yyyy');
      }
    },
    {
      title: t('users.table.header.registeredBy'),
      dataIndex: 'registeredByFIO',
      key: 'registeredByFIO',
      render: (value: string | number) => {
        return value;
      }
    }
  ];

  return (
    <div>
      <div>
        <Typography.Title tag="h1" className={s.title}>
          {title || t('users.header.title')}
        </Typography.Title>

        <Filter setFilter={setQueryParams} />

        <div className={s.buttons_wrapper}>
          <Button
            view="extra"
            size="m"
            onClick={() => navigate(NEW_USER, { state: { merchantId } })}
          >
            {t('users.button.addUser')}
          </Button>
          {checkedItems.length !== 0 && (
            <Button size="m">{t('button.delete')}</Button>
          )}
        </div>
        <Table
          columns={columns}
          dataSource={data}
          isLoading={isFetching}
          limit={limit}
          onClick={item => navigate(`${USERS}/${item.login}/`)}
        />
      </div>
      <Pagination
        onPageChange={onPageChange}
        currentPageIndex={currentPageIndex}
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
        pagesCount={pagesCount}
        onSelect={onSelect}
        limit={[limit]}
      />
    </div>
  );
};

UsersPage.defaultProps = {
  title: undefined,
  merchantId: undefined
};

export default UsersPage;
