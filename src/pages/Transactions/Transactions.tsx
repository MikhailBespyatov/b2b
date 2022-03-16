import React, { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid } from '@alfalab/core-components/grid';
import { Controller, useForm } from 'react-hook-form';
import FormField from 'arui-feather/form-field';
import { Label } from 'arui-feather/label';
import Input from 'arui-feather/input';
import CalendarInput from 'arui-feather/calendar-input';

import { IconButton } from '@alfalab/core-components/icon-button';
import { Pagination } from '@alfalab/core-components/pagination';
import { Typography } from '@alfalab/core-components/typography';
import Select from 'arui-feather/select';
import PhoneInput from 'arui-feather/phone-input';
import MoneyInput from 'arui-feather/money-input';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronForwardMIcon } from '@alfalab/icons-glyph/ChevronForwardMIcon';

import { selectStatusesUnique } from 'redux/slices/app-slice';
import { isPhoneNumberValid } from 'utils/helpers';
import { useGetTransactionsQuery } from 'services/api/transactionAPI';
import { IOrderFilter, IOrderSort } from 'models/IOrder';
import { IStatusOption } from 'models/IStatus';
import { RootStateType } from 'redux/store';
import { TableExport, OrderList } from './partials';

import './Transactions.css';

type IFormValues = {
  transactionNumber: string;
  AppStatus: IStatusOption;
  merchant_order_id: number;
  PhoneNumber: string;
  CreatedAt: string;
  OTPUpdatedAt: string;
  order_amount: number;
};

const Transactions: FC = () => {
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      transactionNumber: '',
      merchant_order_id: '',
      AppStatus: null,
      order_amount: 0,
      CreatedAt: '',
      OTPUpdatedAt: '',
      PhoneNumber: ''
    }
  });

  const [queryParams, setQueryParams] = useState<IOrderFilter>({
    merchant_order_id: undefined,
    AppStatus: undefined,
    order_amount: undefined,
    CreatedAt: undefined,
    OTPUpdatedAt: undefined,
    PhoneNumber: undefined
  });
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [tableSort, setTableSort] = useState<IOrderSort>({
    field: '',
    sort: ''
  });

  const optionValues = useSelector((state: RootStateType) =>
    selectStatusesUnique(state)
  );

  const { currentData, isFetching, isSuccess } = useGetTransactionsQuery({
    ...queryParams,
    sort: tableSort.field ? `${tableSort.sort},${tableSort.field}` : undefined,
    page: currentPage,
    limit
  });

  const renderTableExport = useMemo(() => {
    return <TableExport />;
  }, []);

  const handleFilterShow = () => {
    setIsFilterVisible(prev => !prev);
  };

  const handlePageChange = (value: number) => {
    setCurrentPage(value + 1);
  };

  const handleChangeSort = (value: IOrderSort) => {
    setTableSort(value);
  };

  const onSubmit = handleSubmit((values: IFormValues) => {
    const newParams = {
      merchant_order_id: values.merchant_order_id
        ? values.merchant_order_id
        : undefined,
      AppStatus: values.AppStatus?.values ? values.AppStatus.values : undefined,
      order_amount: values.order_amount ? values.order_amount : undefined,
      CreatedAt: undefined,
      OTPUpdatedAt: undefined,
      PhoneNumber: undefined
    } as IOrderFilter;

    if (values.CreatedAt) {
      const createdAt = new Date(values.CreatedAt);
      newParams.CreatedAt = createdAt.toISOString();
    }

    if (values.OTPUpdatedAt) {
      const otpUpdatedAt = new Date(values.OTPUpdatedAt);
      newParams.OTPUpdatedAt = otpUpdatedAt.toISOString();
    }

    if (values.PhoneNumber && isPhoneNumberValid(values.PhoneNumber)) {
      newParams.PhoneNumber = values.PhoneNumber;
    }

    setQueryParams(newParams);
  });

  return (
    <>
      <Typography.Title tag="h1" font="system" className="mb-34">
        {t('transactions.header.title')}
      </Typography.Title>
      <Label size="l" className="bold-700">
        {t('transactions.filter.title')}
      </Label>
      <IconButton
        size="xxs"
        icon={isFilterVisible ? ChevronDownMIcon : ChevronForwardMIcon}
        onClick={handleFilterShow}
      />
      {isFilterVisible && (
        <div className="transactions__filter-form">
          <form onSubmit={onSubmit}>
            <Grid.Row>
              <Grid.Col width={{ desktop: { s: 6, m: 4 } }}>
                <FormField size="m">
                  <Controller
                    name="merchant_order_id"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="s"
                        label={t('transactions.filter.orderNumber')}
                        name="number"
                        width="available"
                      />
                    )}
                  />
                </FormField>
                <FormField size="m">
                  <Controller
                    name="CreatedAt"
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
              <Grid.Col width={{ desktop: { s: 6, m: 4 } }}>
                <FormField size="m">
                  <Controller
                    name="transactionNumber"
                    control={control}
                    render={({ field }) => (
                      <Input
                        size="s"
                        width="available"
                        label={t('transactions.filter.transactionNumber')}
                        {...field}
                      />
                    )}
                  />
                </FormField>
                <FormField size="m">
                  <Controller
                    name="OTPUpdatedAt"
                    control={control}
                    render={({ field: { onChange, value } }) => (
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
              <Grid.Col width={{ desktop: { s: 6, m: 4 } }}>
                <FormField size="m">
                  <Controller
                    name="PhoneNumber"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        size="s"
                        width="available"
                        label={t('transactions.filter.phoneNumber')}
                        placeholder="+7 000 000 00 00"
                        {...field}
                      />
                    )}
                  />
                </FormField>
                <Grid.Row>
                  <Grid.Col width={{ desktop: { s: 6, m: 6 } }}>
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
                            />
                          );
                        }}
                      />
                    </FormField>
                  </Grid.Col>
                  <Grid.Col width={{ desktop: { s: 6, m: 6 } }}>
                    <FormField size="m">
                      <Controller
                        name="AppStatus"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            size="s"
                            width="available"
                            label={t('transactions.filter.orderStatus')}
                            mode="radio"
                            options={optionValues}
                            value={value || []}
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
          </form>
        </div>
      )}
      {renderTableExport}
      <OrderList
        data={currentData?.orders}
        limit={limit}
        isLoading={isFetching}
        isSuccess={isSuccess}
        orderSort={tableSort}
        handleChangeSort={handleChangeSort}
      />

      <div className="mb-20">
        <div className="d-flex justify-between">
          <Select
            mode="radio"
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
                setCurrentPage(1);
              }
            }}
          />
          <Pagination
            currentPageIndex={currentPage - 1}
            pagesCount={currentData?.totalPages ?? 1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Transactions;
