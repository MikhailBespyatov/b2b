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
import {
  useGetStatusesQuery,
  useGetTransactionsQuery
} from '../../services/api/transactionAPI';
import { debounce } from '../../utils/debounce';
import { IOrderSort } from '../../models/IOrder';
import './Transactions.css';

export const Transactions: FC = () => {
  const { t } = useTranslation();
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [tableSort, setTableSort] = useState<IOrderSort>({
    id: '',
    created_at: '',
    amount: ''
  });
  const [watchFields, setWatchFields] = useState({
    id: undefined,
    merchantId: undefined,
    phoneNumber: undefined,
    dateCreate: undefined,
    deliveryDate: undefined,
    status: undefined,
    amount: undefined
  });

  const { data, isFetching } = useGetTransactionsQuery({
    ...watchFields,
    page: currentPage,
    limit
  });

  const { data: statuses } = useGetStatusesQuery(undefined);

  const renderTableExport = useMemo(() => {
    return <TableExport />;
  }, []);

  const handleFilterShow = () => {
    setIsFilterVisible(prev => !prev);
  };

  const handleFieldsChange = (field: string) =>
    debounce((value: any) => {
      setWatchFields(prev => ({
        ...prev,
        [field]: value
      }));
    }, 500);

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
  };

  const handleChangeSort = (value: IOrderSort) => {
    setTableSort(value);
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
                  onChange={handleFieldsChange('id')}
                />
              </FormField>
              <FormField size="m">
                <Input
                  size="m"
                  width="available"
                  label={t('transactions.filter.transactionNumber')}
                  onChange={handleFieldsChange('merchantId')}
                />
              </FormField>
            </Col>
            <Col md={4} sm={6} xs={12}>
              <FormField size="m">
                <IntlPhoneInput
                  size="m"
                  width="available"
                  label={t('transactions.filter.phoneNumber')}
                  onChange={handleFieldsChange('phoneNumber')}
                />
              </FormField>
              <FormField size="m">
                <CalendarInput
                  size="m"
                  width="available"
                  label={t('transactions.filter.createdDate')}
                  onChange={handleFieldsChange('dateCreate')}
                />
              </FormField>
            </Col>
            <Col md={4} sm={12} xs={12}>
              <Row>
                <Col md={6} sm={6} xs={12}>
                  <FormField size="m">
                    <Select
                      size="m"
                      mode="radio"
                      width="available"
                      options={statuses}
                      label={t('transactions.filter.orderStatus')}
                      className="select_theme_alfa-on-white select-button"
                      onChange={handleFieldsChange('status')}
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
                      onChange={handleFieldsChange('amount')}
                    />
                  </FormField>
                </Col>
              </Row>
              <FormField size="m">
                <CalendarInput
                  size="m"
                  width="available"
                  label={t('transactions.filter.deliveredDate')}
                  onChange={handleFieldsChange('deliveryDate')}
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
      <div className="table-pagination">
        <Pagination
          currentPageIndex={currentPage}
          pagesCount={data?.lim}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
