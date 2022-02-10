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

import { TableExport, OrderList } from './partials';
import { useGetTransactionsQuery } from '../../services/api/transactionAPI';
import { IOrderFilter, IOrderSort } from '../../models/IOrder';
import { RootStateType } from '../../redux/store';
import { isPhoneNumberValid } from '../../utils/helpers';
import './Transactions.css';

export const Transactions: FC = () => {
  const today = new Date();
  const { t } = useTranslation();
  const { handleSubmit, control, reset, getValues } = useForm({
    defaultValues: {
      transactionNumber: '',
      merchant_order_id: '',
      app_status: null,
      order_amount: 0,
      created_at: '',
      otp_updated_at: '',
      ph_number: ''
    }
  });

  const [queryParams, setQueryParams] = useState<IOrderFilter>({
    merchant_order_id: undefined,
    app_status: undefined,
    order_amount: undefined,
    created_at: undefined,
    otp_updated_at: undefined,
    ph_number: undefined
  });
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [tableSort, setTableSort] = useState<IOrderSort>({
    field: '',
    sort: ''
  });

  const optionValues = useSelector(
    (state: RootStateType) => state.app.statuses.unique
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

  const onSubmit = handleSubmit((values: any) => {
    const newParams = {
      merchant_order_id: values.merchant_order_id
        ? values.merchant_order_id
        : undefined,
      app_status: values.app_status?.values
        ? values.app_status.values
        : undefined,
      order_amount: values.order_amount ? values.order_amount : undefined,
      created_at: undefined,
      otp_updated_at: undefined,
      ph_number: undefined
    } as IOrderFilter;

    if (values.created_at) {
      const createdAt = new Date(values.created_at);
      newParams.created_at = createdAt.toISOString();
    }

    if (values.otp_updated_at) {
      const otpUpdatedAt = new Date(values.otp_updated_at);
      newParams.otp_updated_at = otpUpdatedAt.toISOString();
    }

    if (isPhoneNumberValid(values.ph_number)) {
      newParams.ph_number = values.ph_number;
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
                    render={({ field }: any) => (
                      <Input
                        size="s"
                        label={t('transactions.filter.orderNumber')}
                        name="number"
                        block={true}
                        {...field}
                      />
                    )}
                  />
                </FormField>
                <FormField size="m">
                  <Controller
                    name="transactionNumber"
                    control={control}
                    render={({ field }: any) => (
                      <Input
                        size="s"
                        label={t('transactions.filter.transactionNumber')}
                        block={true}
                        {...field}
                      />
                    )}
                  />
                </FormField>
              </Col>
              <Col md={4} sm={6} xs={12}>
                <FormField size="m">
                  <Controller
                    name="ph_number"
                    control={control}
                    render={({ field: { onChange, value } }: any) => (
                      <IntlPhoneInput
                        size="s"
                        label={t('transactions.filter.phoneNumber')}
                        defaultCountryIso2="KZ"
                        block={true}
                        value={value}
                        success={isPhoneNumberValid(getValues('ph_number'))}
                        onChange={value => onChange(value)}
                      />
                    )}
                  />
                </FormField>
                <FormField size="m">
                  <Controller
                    name="created_at"
                    control={control}
                    render={({ field: { onChange, value } }: any) => (
                      <CalendarInput
                        label={t('transactions.filter.createdDate')}
                        block={true}
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
                        name="app_status"
                        control={control}
                        render={({ field: { onChange, value } }: any) => (
                          <Select
                            size="s"
                            optionsListWidth="content"
                            optionsSize="s"
                            options={optionValues}
                            disabled={optionValues.length === 0}
                            label={t('transactions.filter.orderStatus')}
                            block={true}
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
                        render={({ field: { onChange, value } }: any) => {
                          return (
                            <AmountInput
                              size="s"
                              label={t('transactions.filter.amount')}
                              bold={false}
                              minority={1}
                              currency="KZT"
                              block={true}
                              integersOnly={true}
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
                    name="otp_updated_at"
                    control={control}
                    render={({ field: { onChange, value } }: any) => (
                      <CalendarInput
                        label={t('transactions.filter.deliveredDate')}
                        block={true}
                        maxDate={today.getTime()}
                        value={value}
                        onChange={(e, input) => onChange(input.value)}
                      />
                    )}
                  />
                </FormField>
              </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
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
          pagesCount={currentData?.totalPages || 1}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
