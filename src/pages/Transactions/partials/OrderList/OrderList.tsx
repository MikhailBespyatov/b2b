import React, { FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { TagButton } from 'arui-feather/tag-button';
import { Space } from '@alfalab/core-components/space';
import { IconButton } from '@alfalab/core-components/icon-button';
import { ModalResponsive } from '@alfalab/core-components/modal/responsive';
import { ArrowDownCompactXsIcon } from '@alfalab/icons-glyph/ArrowDownCompactXsIcon';
import { ArrowUpCompactXsIcon } from '@alfalab/icons-glyph/ArrowUpCompactXsIcon';
import { Skeleton } from '@alfalab/core-components/skeleton';

import { TRANSACTIONS } from 'navigation/CONSTANTS';
import { phoneNumberFormatter } from 'utils/formatter/phoneNumberFormatter';
import { moneyFormatter } from 'utils/formatter/moneyFormatter';
import {
  CheckmarkIcon,
  CrossHeavyIcon,
  PencilHeavyIcon
} from 'components/ui/icons';
import { IOrderInfo, IOrderSort, IOrderSortFields } from 'models/IOrder';
import { sortOperator } from 'utils/sorts';
import { RootStateType } from 'redux/store';
import { selectStatusesList } from 'redux/slices/app-slice';
import { uuid } from 'utils/uuid';
import { FINAL_ORDER_STATUSES } from 'config/constants/status.constants';
import { ModalType } from '../../Transactions.model';
import {
  OrderCancel,
  DeliveryToCourier,
  PopConfirm,
  SmsConfirm
} from '../index';

type PropTypes = {
  data: IOrderInfo[];
  limit: number;
  isLoading: boolean;
  isSuccess: boolean;
  orderSort: IOrderSort;
  handleChangeSort: (value: IOrderSort) => void;
};

export const OrderList: FC<PropTypes> = ({
  data,
  limit,
  isLoading,
  isSuccess,
  orderSort,
  handleChangeSort
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>();
  const [currentOrder, setCurrentOrder] = useState<IOrderInfo>();
  const statusList = useSelector((state: RootStateType) =>
    selectStatusesList(state)
  );

  const handleModalOpen =
    (type: ModalType, order: IOrderInfo) => (e: React.SyntheticEvent) => {
      e.stopPropagation();
      setOpen(true);
      setModalType(type);
      setCurrentOrder(order);
    };

  const handleModalClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const renderModalContent = (type: ModalType) => {
    if (currentOrder?.merchant_order_id) {
      switch (type) {
        case 'CONFIRM_CANCEL':
          return (
            <OrderCancel
              id={currentOrder.id}
              amount={currentOrder.amount}
              merchantOrderId={currentOrder.merchant_order_id}
              orderStatus={currentOrder.app_status}
              title={t('transactions.modal.title.cancelOrder')}
              handleClose={handleModalClose}
            />
          );
        case 'DELIVERY_TO_COURIER':
          return (
            <DeliveryToCourier
              id={currentOrder.id}
              merchantOrderId={currentOrder.merchant_order_id}
              title={t('transactions.modal.title.sendForDelivery')}
              text={t('transactions.modal.text.sendForDelivery')}
              successMessage={t('transactions.modal.title.sentForDelivery')}
            />
          );
        case 'DELIVERY_TO_CLIENT':
          return (
            <PopConfirm
              title={t('transactions.modal.title.sendForDelivery')}
              text={t('transactions.modal.text.sendForDelivery')}
              okText={t('button.send')}
              cancelText={t('button.cancel')}
              onCancel={handleModalClose}
            >
              <SmsConfirm
                order={currentOrder}
                successMessage={t('transactions.modal.success.delivered')}
              />
            </PopConfirm>
          );
        default:
          return null;
      }
    }

    return null;
  };

  const handleSortButtonClick = (field: IOrderSortFields) => () => {
    const sortValue = sortOperator(orderSort.sort);

    handleChangeSort({
      field: sortValue ? field : '',
      sort: orderSort.field === field ? sortValue : 'asc'
    });
  };

  const handleItemClick = (id: number) => () => {
    navigate(`${TRANSACTIONS}/${id}`);
  };

  const renderSortButton = (field: IOrderSortFields) => {
    if (field === orderSort.field) {
      return (
        <span>
          {orderSort.sort === 'asc' ? (
            <ArrowUpCompactXsIcon fill="#1A8DF9" />
          ) : (
            <ArrowUpCompactXsIcon />
          )}
          {orderSort.sort === 'desc' ? (
            <ArrowDownCompactXsIcon fill="#1A8DF9" />
          ) : (
            <ArrowDownCompactXsIcon />
          )}
        </span>
      );
    }
    return (
      <span>
        <ArrowUpCompactXsIcon />
        <ArrowDownCompactXsIcon />
      </span>
    );
  };

  return (
    <>
      <div className="overflowX mb-24">
        <table className="table">
          <thead>
            <tr>
              <td role="gridcell" onClick={handleSortButtonClick('id')}>
                <div>
                  {t('transactions.table.orderNumber')}
                  {renderSortButton('id')}
                </div>
              </td>
              <td role="gridcell" onClick={handleSortButtonClick('created_at')}>
                <div>
                  {t('transactions.filter.createdDate')}
                  {renderSortButton('created_at')}
                </div>
              </td>
              <td role="gridcell" onClick={handleSortButtonClick('created_at')}>
                <div>
                  {t('transactions.filter.deliveredDate')}
                  {renderSortButton('created_at')}
                </div>
              </td>
              <td
                role="gridcell"
                onClick={handleSortButtonClick('items_amount')}
              >
                <div>
                  {t('transactions.table.amount')}
                  {renderSortButton('items_amount')}
                </div>
              </td>
              <td>{t('user.phoneNumber')}</td>
              <td>{t('transactions.table.address')}</td>
              <td>{t('transactions.table.status')}</td>
              <td>{t('transactions.table.action')}</td>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
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
              data.map((item: IOrderInfo) => {
                return (
                  <tr
                    key={item.id}
                    className="c-pointer"
                    onClick={handleItemClick(item.id)}
                  >
                    <td
                      className={
                        orderSort.field === 'id' ? 'table__sorted' : ''
                      }
                    >
                      {item.merchant_order_id}
                    </td>
                    <td
                      className={
                        orderSort.field === 'created_at' ? 'table__sorted' : ''
                      }
                    >
                      {format(parseISO(item.created_at), 'dd.MM.yyyy')}
                    </td>
                    <td
                      className={
                        orderSort.field === 'created_at' ? 'table__sorted' : ''
                      }
                    >
                      {format(parseISO(item.created_at), 'dd.MM.yyyy')}
                    </td>
                    <td
                      className={
                        orderSort.field === 'items_amount'
                          ? 'table__sorted'
                          : ''
                      }
                    >
                      {moneyFormatter.format(item.amount)}
                    </td>
                    <td>{phoneNumberFormatter(item.phoneNumber)}</td>
                    <td> </td>
                    <td>
                      <TagButton
                        size="s"
                        className={`status status-${item.app_status} bold-700`}
                      >
                        {statusList[item.app_status]?.toUpperCase() ??
                          t(
                            'transactions.status.type.unexpected'
                          ).toUpperCase()}
                      </TagButton>
                    </td>
                    <td>
                      {item?.app_status &&
                        FINAL_ORDER_STATUSES.includes(item.app_status) &&
                        item?.merchant_order_id && (
                          <Space direction="horizontal" size={8}>
                            <IconButton
                              size="xxs"
                              icon={PencilHeavyIcon}
                              className="icon-button bg-blue"
                            />
                            <IconButton
                              size="xxs"
                              icon={CheckmarkIcon}
                              className="icon-button bg-green"
                              onClick={handleModalOpen(
                                item.app_status === 'new'
                                  ? 'DELIVERY_TO_COURIER'
                                  : 'DELIVERY_TO_CLIENT',
                                item
                              )}
                            />
                            <IconButton
                              size="xxs"
                              icon={CrossHeavyIcon}
                              className="icon-button bg-red"
                              onClick={handleModalOpen('CONFIRM_CANCEL', item)}
                            />
                          </Space>
                        )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <ModalResponsive open={open} onClose={handleModalClose} size="m">
        <ModalResponsive.Header hasCloser size="m" />
        <ModalResponsive.Content>
          {renderModalContent(modalType)}
        </ModalResponsive.Content>
      </ModalResponsive>
    </>
  );
};
