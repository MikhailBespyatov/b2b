import React, { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-grid-system';
import { Controller, useForm } from 'react-hook-form';
import FormField from 'arui-feather/form-field';
import { Label } from 'arui-feather/label';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Pagination } from '@alfalab/core-components/pagination';
import { Typography } from '@alfalab/core-components/typography';
import { EyeLineMIcon } from '@alfalab/icons-glyph/EyeLineMIcon';
import { EyeOffLineMIcon } from '@alfalab/icons-glyph/EyeOffLineMIcon';
import { Select } from '@alfalab/core-components/select';
import { CalendarInput } from '@alfalab/core-components/calendar-input';
import { IntlPhoneInput } from '@alfalab/core-components/intl-phone-input';
import { AmountInput } from '@alfalab/core-components/amount-input';
import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';
import { Space } from '@alfalab/core-components/space';

import { selectStatusesUnique } from 'redux/slices/app-slice';
import { isPhoneNumberValid } from 'utils/helpers';
import { useGetTransactionsQuery } from 'services/api/transactionAPI';
import { IOrderFilter, IOrderSort } from 'models/IOrder';
import { IStatusOption } from 'models/IStatus';
import { TableExport, OrderList } from './partials';

import './Transactions.css';
import { RootStateType } from '../../redux/store';

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
  const today = new Date();
  const { t } = useTranslation();
  const { handleSubmit, control, reset, getValues } = useForm({
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
  const [limit] = useState(10);
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
      <Typography.Title
        tag="h1"
        font="system"
        className="title-1 transaction__title"
      >
        {t('transactions.header.title')}
      </Typography.Title>
      <div className="transactions__filter-head">
        <Label size="l" className="bold_700">
          {t('transactions.filter.title')}
        </Label>
        <IconButton
          size="xxs"
          icon={isFilterVisible ? EyeLineMIcon : EyeOffLineMIcon}
          style={{ border: '1px solid rgba(0,0,0,0.1)' }}
          onClick={handleFilterShow}
        />
      </div>
      {isFilterVisible && (
        <div className="transactions__filter-form">
          <form onSubmit={onSubmit}>
            <Row>
              <Col md={4} sm={6} xs={12}>
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
                        block
                      />
                    )}
                  />
                </FormField>
                <FormField size="m">
                  <Controller
                    name="transactionNumber"
                    control={control}
                    render={({ field }) => (
                      <Input
                        size="s"
                        label={t('transactions.filter.transactionNumber')}
                        block
                        {...field}
                      />
                    )}
                  />
                </FormField>
              </Col>
              <Col md={4} sm={6} xs={12}>
                <FormField size="m">
                  <Controller
                    name="PhoneNumber"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <IntlPhoneInput
                        size="s"
                        label={t('transactions.filter.phoneNumber')}
                        defaultCountryIso2="KZ"
                        block
                        value={value}
                        success={isPhoneNumberValid(getValues('PhoneNumber'))}
                        onChange={inputValue => onChange(inputValue)}
                      />
                    )}
                  />
                </FormField>
                <FormField size="m">
                  <Controller
                    name="CreatedAt"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <CalendarInput
                        label={t('transactions.filter.createdDate')}
                        block
                        maxDate={today.getTime()}
                        value={value}
                        onChange={(e, input) => onChange(input.value)}
                      />
                    )}
                  />
                </FormField>
              </Col>
              <Col md={4} sm={12} xs={12}>
                <Row>
                  <Col md={6} sm={6} xs={12}>
                    <FormField size="m">
                      <Controller
                        name="AppStatus"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            size="s"
                            optionsListWidth="content"
                            optionsSize="s"
                            options={optionValues}
                            disabled={optionValues.length === 0}
                            label={t('transactions.filter.orderStatus')}
                            block
                            selected={value}
                            onChange={select => onChange(select.selected)}
                          />
                        )}
                      />
                    </FormField>
                  </Col>
                  <Col md={6} sm={6} xs={12}>
                    <FormField size="m">
                      <Controller
                        name="order_amount"
                        control={control}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <AmountInput
                              size="s"
                              label={t('transactions.filter.amount')}
                              minority={1}
                              currency="KZT"
                              block
                              integersOnly
                              value={value.toString().replace(/\s/g, '')}
                              onChange={(e, input) =>
                                onChange(input.valueString)
                              }
                            />
                          );
                        }}
                      />
                    </FormField>
                  </Col>
                </Row>
                <FormField size="m">
                  <Controller
                    name="OTPUpdatedAt"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <CalendarInput
                        label={t('transactions.filter.deliveredDate')}
                        block
                        maxDate={today.getTime()}
                        value={value}
                        onChange={(e, input) => onChange(input.value)}
                      />
                    )}
                  />
                </FormField>
              </Col>
            </Row>
            <div className="flex-end">
              <Space direction="horizontal">
                <Button view="secondary" size="xs" onClick={() => reset()}>
                  Очистить
                </Button>
                <Button view="primary" size="xs" type="submit">
                  Применить
                </Button>
              </Space>
            </div>
          </form>
        </div>
      )}
      {renderTableExport}
      <OrderList
        data={currentData?.orders}
        isLoading={isFetching}
        isSuccess={isSuccess}
        orderSort={tableSort}
        handleChangeSort={handleChangeSort}
      />
      <div className="mb-20">
        <Pagination
          currentPageIndex={currentPage - 1}
          pagesCount={currentData?.totalPages ?? 1}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Transactions;
