import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-grid-system';
import FormField from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import { Label } from 'arui-feather/label';
import { MoneyInput } from 'arui-feather/money-input';
import { IntlPhoneInput } from 'arui-feather/intl-phone-input';
import CalendarInput from 'arui-feather/calendar-input';
import { Select } from 'arui-feather/select';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Pagination } from '@alfalab/core-components/pagination';
import { Typography } from '@alfalab/core-components/typography';
import { EyeLineMIcon } from '@alfalab/icons-glyph/EyeLineMIcon';
import { EyeOffLineMIcon } from '@alfalab/icons-glyph/EyeOffLineMIcon';

import { TableExport, OrderList } from './partials';
import { useGetTransactionsQuery } from '../../services/api/transactionAPI';
import { useGetStatusesQuery } from '../../services/api/directoryApi';
import { debounce } from '../../utils/debounce';
import {
  IOrderFilter,
  IOrderFilterFields,
  IOrderSort
} from '../../models/IOrder';
import { toSelectOptions } from '../../utils/helpers';

import './Transactions.css';

export const Transactions: FC = () => {
  const { t } = useTranslation();
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [tableSort, setTableSort] = useState<IOrderSort>({
    field: '',
    sort: ''
  });
  const [watchFields, setWatchFields] = useState<IOrderFilter>({
    merchant_order_id: undefined,
    ph_number: undefined,
    created_at: undefined,
    otp_updated_at: undefined,
    app_status: undefined,
    order_amount: undefined
  });

  const { data, isFetching } = useGetTransactionsQuery({
    ...watchFields,
    sort: tableSort.field ? `${tableSort.sort},${tableSort.field}` : undefined,
    page: currentPage,
    limit
  });

  const { data: statusesData } = useGetStatusesQuery('');

  const renderTableExport = useMemo(() => {
    return <TableExport />;
  }, []);

  const handleFilterShow = () => {
    setIsFilterVisible(prev => !prev);
  };

  const handleFieldsChange = (field: IOrderFilterFields) =>
    debounce((value: string | number) => {
      if (field) {
        setWatchFields(prev => ({
          ...prev,
          [field]: value
        }));
      }
    }, 500);

  const handleStatusChange = (value: unknown) => {
    if (Array.isArray(value) && value.length) {
      setWatchFields(prev => ({
        ...prev,
        app_status: value[0]
      }));
    }
  };

  const handlePageChange = (value: number) => {
    setCurrentPage(value + 1);
  };

  const handleChangeSort = (value: IOrderSort) => {
    setTableSort(value);
  };

  const handleDateChange =
    (field: string) =>
    (formattedValue: string | undefined, value?: number | undefined) => {
      if (value) {
        let date = new Date(value);

        setWatchFields(prev => ({
          ...prev,
          [field]: date.toISOString()
        }));
      }
    };

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
          <Row>
            <Col md={4} sm={6} xs={12}>
              <FormField size="m">
                <Input
                  size="m"
                  width="available"
                  label={t('transactions.filter.orderNumber')}
                  onChange={handleFieldsChange('merchant_order_id')}
                  defaultValue={watchFields.merchant_order_id?.toString()}
                />
              </FormField>
              <FormField size="m">
                <Input
                  size="m"
                  width="available"
                  label={t('transactions.filter.transactionNumber')}
                />
              </FormField>
            </Col>
            <Col md={4} sm={6} xs={12}>
              <FormField size="m">
                <IntlPhoneInput
                  size="m"
                  width="available"
                  label={t('transactions.filter.phoneNumber')}
                  onChange={handleFieldsChange('ph_number')}
                  defaultValue={watchFields.ph_number}
                />
              </FormField>
              <FormField size="m">
                <CalendarInput
                  size="m"
                  width="available"
                  label={t('transactions.filter.createdDate')}
                  onChange={handleDateChange('created_at')}
                  //defaultValue={watchFields.created_at}
                />
              </FormField>
            </Col>
            <Col md={4} sm={12} xs={12}>
              <Row>
                <Col md={6} sm={6} xs={12}>
                  <FormField size="m">
                    <Select
                      size="m"
                      mode="radio-check"
                      width="available"
                      options={
                        statusesData &&
                        toSelectOptions(statusesData, 'name', 'name')
                      }
                      label={t('transactions.filter.orderStatus')}
                      className="select_theme_alfa-on-white select-button"
                      onChange={value => handleStatusChange(value)}
                      value={[watchFields.app_status || '']}
                    />
                  </FormField>
                </Col>
                <Col md={6} sm={6} xs={12}>
                  <FormField size="m">
                    <MoneyInput
                      showCurrency={true}
                      currencyCode="KZT"
                      width="available"
                      label={t('transactions.filter.amount')}
                      onChange={handleFieldsChange('order_amount')}
                      defaultValue={watchFields.order_amount?.toString()}
                    />
                  </FormField>
                </Col>
              </Row>
              <FormField size="m">
                <CalendarInput
                  size="m"
                  width="available"
                  label={t('transactions.filter.deliveredDate')}
                  onChange={handleDateChange('otp_updated_at')}
                  //defaultValue={watchFields.otp_updated_at}
                />
              </FormField>
            </Col>
          </Row>
        </div>
      )}
      {renderTableExport}
      <OrderList
        data={data?.orders}
        isLoading={isFetching}
        orderSort={tableSort}
        handleChangeSort={handleChangeSort}
      />
      <div className="mb-20">
        <Pagination
          currentPageIndex={currentPage - 1}
          pagesCount={data?.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
