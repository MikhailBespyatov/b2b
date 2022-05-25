import React, { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { useAccess } from 'react-acceder';
import FormField from 'arui-feather/form-field';
import { Label } from 'arui-feather/label';
import Input from 'arui-feather/input';
import CalendarInput from 'arui-feather/calendar-input';
import Select from 'arui-feather/select';
import PhoneInput from 'arui-feather/phone-input';
import MoneyInput from 'arui-feather/money-input';
import Button from 'arui-feather/button';
import { Grid } from '@alfalab/core-components/grid';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Pagination } from '@alfalab/core-components/pagination';
import { Typography } from '@alfalab/core-components/typography';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronForwardMIcon } from '@alfalab/icons-glyph/ChevronForwardMIcon';

import { selectMerchant, selectStatusesUnique } from 'redux/slices/app-slice';
import { useGetTransactionsQuery } from 'services/api/transactionAPI';
import { IOrderFilter, IOrderSort } from 'models/IOrder';
import { RootStateType } from 'redux/store';
import { phoneNumberWithoutFormat } from 'utils/formatter/phoneNumberFormatter';
import { TableExport, OrderList } from './partials';

import { objectClear } from '../../utils/objectClear';
import './Transactions.css';

type IFormValues = {
  orderId: string;
  id: number;
  status: string[];
  order_amount: number;
  dateCreate: string;
  deliveryDate: string;
  ph_number: string;
};

const Transactions: FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useSearchParams();
  const user = useAccess();
  const merchantId = useSelector((state: RootStateType) =>
    selectMerchant(state)
  );

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      orderId: undefined,
      id: undefined,
      status: '',
      order_amount: '',
      dateCreate: '',
      deliveryDate: '',
      ph_number: ''
    }
  });

  const [queryParams, setQueryParams] = useState<IOrderFilter>({
    orderId: undefined,
    id: undefined,
    status: '',
    order_amount: '',
    dateCreate: '',
    deliveryDate: '',
    ph_number: ''
  });
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const [limit, setLimit] = useState(25);
  const [tableSort, setTableSort] = useState<IOrderSort>({
    field: '',
    sort: ''
  });

  const optionValues = useSelector((state: RootStateType) =>
    selectStatusesUnique(state)
  );

  const { currentData, isFetching, isSuccess } = useGetTransactionsQuery({
    ...objectClear(queryParams),
    merchantId,
    sort: tableSort.field ? `${tableSort.sort},${tableSort.field}` : undefined,
    page: search.get('page') || 1,
    limit
  });

  const renderTableExport = useMemo(() => {
    return <TableExport />;
  }, []);

  const handleFilterShow = () => {
    setIsFilterVisible(prev => !prev);
  };

  const handlePageChange = (value: number) => {
    setSearch(`?page=${value + 1}`);
  };

  const handleChangeSort = (value: IOrderSort) => {
    setTableSort(value);
  };

  const onSubmit = handleSubmit((values: IFormValues) => {
    const newParams = {
      orderId: values.orderId ?? undefined,
      id: values.id ?? undefined,
      status: values.status ?? undefined,
      order_amount: values.order_amount ?? undefined,
      dateCreate: undefined,
      deliveryDate: undefined,
      ph_number: undefined
    } as unknown as IOrderFilter;

    if (values.status) {
      newParams.status = optionValues[Number(values.status)].values?.[0];
    }

    if (values.dateCreate) {
      const createdAt = format(new Date(values.dateCreate), 'yyyy-MM-dd');
      newParams.dateCreate = `${createdAt}T00:00:00.000000`;
    }

    if (values.deliveryDate) {
      const deliveryDate = format(new Date(values.deliveryDate), 'yyyy-MM-dd');
      newParams.deliveryDate = `${deliveryDate}T00:00:00.000000`;
    }

    if (values.ph_number) {
      newParams.ph_number = phoneNumberWithoutFormat(values.ph_number);
    }

    setQueryParams(newParams);
  });

  const handleReset = () => {
    setQueryParams({
      orderId: undefined,
      id: undefined,
      status: undefined,
      order_amount: '',
      dateCreate: '',
      deliveryDate: '',
      ph_number: ''
    });
    reset();
  };

  return (
    <>
      <Typography.Title tag="h1" font="system" className="mb-34">
        {t('transactions.header.title')}
      </Typography.Title>
      <Label size="l" className="bold-700">
        {t('transactions.filter.title')}
        <IconButton
          size="xxs"
          icon={isFilterVisible ? ChevronDownMIcon : ChevronForwardMIcon}
          onClick={handleFilterShow}
        />
      </Label>
      {isFilterVisible && (
        <div className="transactions__filter-form">
          <form onSubmit={onSubmit}>
            <Grid.Row className="container">
              <Grid.Col
                width={{
                  mobile: { s: 12, m: 12, l: 12 },
                  tablet: { s: 4, m: 4, l: 4 },
                  desktop: { s: 4, m: 4, l: 4 }
                }}
              >
                <FormField size="m">
                  <Controller
                    name="orderId"
                    control={control}
                    render={({ field: { value = '', onChange } }) => {
                      return (
                        <Input
                          size="s"
                          label={t('transactions.filter.orderId')}
                          width="available"
                          value={value}
                          onChange={inputValue => onChange(inputValue)}
                        />
                      );
                    }}
                  />
                </FormField>
                <FormField size="m">
                  <Controller
                    name="dateCreate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <CalendarInput
                        label={t('transactions.filter.createdDate')}
                        width="available"
                        size="s"
                        value={value}
                        onChange={inputValue => onChange(inputValue)}
                      />
                    )}
                  />
                </FormField>
              </Grid.Col>
              <Grid.Col
                width={{
                  mobile: { s: 12, m: 12, l: 12 },
                  tablet: { s: 4, m: 4, l: 4 },
                  desktop: { s: 4, m: 4, l: 4 }
                }}
              >
                <FormField size="m">
                  <Controller
                    name="id"
                    control={control}
                    render={({ field: { value = '', onChange } }) => (
                      <Input
                        size="s"
                        width="available"
                        label={t('transactions.filter.id')}
                        value={value}
                        onChange={inputValue => onChange(inputValue)}
                      />
                    )}
                  />
                </FormField>
                <FormField size="m">
                  <Controller
                    name="deliveryDate"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <CalendarInput
                        label={t('transactions.filter.deliveredDate')}
                        width="available"
                        size="s"
                        value={value}
                        onChange={inputValue => onChange(inputValue)}
                      />
                    )}
                  />
                </FormField>
              </Grid.Col>
              <Grid.Col
                width={{
                  mobile: { s: 12, m: 12, l: 12 },
                  tablet: { s: 4, m: 4, l: 4 },
                  desktop: { s: 4, m: 4, l: 4 }
                }}
              >
                <FormField size="m">
                  <Controller
                    name="ph_number"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        size="s"
                        width="available"
                        label={t('user.phoneNumber')}
                        placeholder="+7 000 000 00 00"
                        {...field}
                      />
                    )}
                  />
                </FormField>
                <Grid.Row
                  gutter={{
                    mobile: { s: 0, m: 0, l: 0 },
                    tablet: { s: 24, m: 24, l: 24 },
                    desktop: { s: 24, m: 24, l: 24 }
                  }}
                >
                  <Grid.Col
                    width={{
                      mobile: { s: 12, m: 12, l: 12 },
                      tablet: { s: 6, m: 6, l: 6 },
                      desktop: { s: 6, m: 6, l: 6 }
                    }}
                  >
                    <FormField size="m">
                      <Controller
                        name="order_amount"
                        control={control}
                        render={({ field: { value, onChange } }) => {
                          return (
                            <MoneyInput
                              showCurrency
                              currencyCode="KZT"
                              bold
                              size="s"
                              width="available"
                              label={t('transactions.filter.amount')}
                              value={value.toString().replace(/\s/g, '')}
                              onChange={inputValue => onChange(inputValue)}
                              placeholder="0"
                            />
                          );
                        }}
                      />
                    </FormField>
                  </Grid.Col>
                  <Grid.Col
                    width={{
                      mobile: { s: 12, m: 12, l: 12 },
                      tablet: { s: 6, m: 6, l: 6 },
                      desktop: { s: 6, m: 6, l: 6 }
                    }}
                  >
                    <FormField size="m">
                      <Controller
                        name="status"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            size="s"
                            width="available"
                            label={t('transactions.filter.orderStatus')}
                            mode="radio"
                            options={[
                              {
                                value: '',
                                text: 'Не выбран',
                                values: []
                              },
                              ...optionValues
                            ]}
                            value={[value]}
                            onChange={values => {
                              onChange(values?.[0]);
                            }}
                          />
                        )}
                      />
                    </FormField>
                  </Grid.Col>
                </Grid.Row>
              </Grid.Col>
            </Grid.Row>
            <div className="transactions__filter-footer">
              <Button view="extra" size="s" type="submit">
                {t('button.apply')}
              </Button>
              <Button size="s" onClick={handleReset}>
                {t('button.reset')}
              </Button>
            </div>
          </form>
        </div>
      )}
      {renderTableExport}
      {user.can('SHOW_TRANSACTION_TABLE') && (
        <OrderList
          data={currentData?.orders}
          limit={limit}
          isLoading={isFetching}
          isSuccess={isSuccess}
          orderSort={tableSort}
          handleChangeSort={handleChangeSort}
        />
      )}
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
            pagesCount={currentData?.totalPages ?? 1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Transactions;
