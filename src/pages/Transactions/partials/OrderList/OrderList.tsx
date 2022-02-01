import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-location';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { TagButton } from 'arui-feather/tag-button';
import AlphaIcon from 'arui-feather/icon/brand/bank-2449';
import { Space } from '@alfalab/core-components/space';
import { IconButton } from '@alfalab/core-components/icon-button';
import { ModalResponsive } from '@alfalab/core-components/modal/responsive';
import { ArrowDownCompactXsIcon } from '@alfalab/icons-glyph/ArrowDownCompactXsIcon';
import { ArrowUpCompactXsIcon } from '@alfalab/icons-glyph/ArrowUpCompactXsIcon';
import { Skeleton } from '@alfalab/core-components/skeleton';

import { TRANSACTIONS } from '../../../../navigation/CONSTANTS';
import { ModalType } from '../../Transactions.model';
import {
  moneyFormatter,
  phoneNumberFormatter
} from '../../../../utils/helpers';
import {
  CheckmarkIcon,
  CrossHeavyIcon,
  PencilHeavyIcon
} from '../../../../components/ui/icons';
import { DeliverOrderOTP, CancelOrder, ConfirmOrder } from '../index';
import {
  IOrder,
  IOrderSort,
  IOrderSortFields
} from '../../../../models/IOrder';
import { sortOperator } from '../../../../utils/sorts';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../../redux/store';

type PropTypes = {
  data: IOrder[];
  isLoading: boolean;
  orderSort: IOrderSort;
  handleChangeSort: (value: IOrderSort) => void;
};

export const OrderList: FC<PropTypes> = ({
  data,
  isLoading,
  orderSort,
  handleChangeSort
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>();
  const [currentOrder, setCurrentOrder] = useState<IOrder>();
  const statusList = useSelector((state: RootStateType) => state.app.statuses);

  const handleModalOpen =
    (type: ModalType, order: IOrder) => (e: React.SyntheticEvent) => {
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
        case 'CONFIRM_ORDER':
          return (
            <ConfirmOrder
              id={currentOrder.id}
              merchantOrderId={currentOrder.merchant_order_id}
              title={t('transactions.modal.title.confirmOrder', {
                orderNumber: currentOrder.id
              })}
            />
          );
        case 'CONFIRM_CANCEL':
          return (
            <CancelOrder
              id={currentOrder.id}
              merchantOrderId={currentOrder.merchant_order_id}
              title={t('transactions.modal.title.cancelOrder')}
              handleClose={handleModalClose}
            />
          );
        case 'DELIVERY_ORDER_OTP':
          return <DeliverOrderOTP order={currentOrder} />;
        default:
          return null;
      }
    }
  };

  const handleSortButtonClick = (field: IOrderSortFields) => () => {
    const sortValue = sortOperator(orderSort.sort);

    handleChangeSort({
      field: sortValue ? field : '',
      sort: orderSort.field === field ? sortValue : 'asc'
    });
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
    } else {
      return (
        <span>
          <ArrowUpCompactXsIcon />
          <ArrowDownCompactXsIcon />
        </span>
      );
    }
  };

  return (
    <>
      <div className="overflowX">
        <table className="table">
          <thead>
            <tr>
              <td onClick={handleSortButtonClick('id')}>
                <div>
                  {t('transactions.table.orderNumber')}
                  {renderSortButton('id')}
                </div>
              </td>
              <td onClick={handleSortButtonClick('created_at')}>
                <div>
                  {t('transactions.table.date')}
                  {renderSortButton('created_at')}
                </div>
              </td>
              <td onClick={handleSortButtonClick('items_amount')}>
                <div>
                  {t('transactions.table.amount')}
                  {renderSortButton('items_amount')}
                </div>
              </td>
              <td>{t('transaction.data.phoneNumber')}</td>
              <td>{t('transactions.table.status')}</td>
              <td>{t('transactions.table.action')}</td>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              Array.from({ length: 15 }, (_, index) => {
                return (
                  <tr key={index}>
                    {Array.from({ length: 6 }, (_, j) => {
                      return (
                        <td key={'td_' + j}>
                          <Skeleton visible={true} animate={true}>
                            -
                          </Skeleton>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            {Array.isArray(data) &&
              data.map((item: IOrder) => {
                return (
                  <tr key={item.id}>
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
                        orderSort.field === 'items_amount'
                          ? 'table__sorted'
                          : ''
                      }
                    >
                      {moneyFormatter.format(item.amount)}
                    </td>
                    <td>{phoneNumberFormatter(item.phoneNumber)}</td>
                    <td>
                      {item.app_status && (
                        <TagButton
                          size="s"
                          className={`status status-${item.app_status}`}
                        >
                          {statusList[item.app_status]?.toUpperCase()}
                        </TagButton>
                      )}
                    </td>
                    <td>
                      {item?.app_status &&
                        item.app_status !== 'cancelled' &&
                        item?.merchant_order_id && (
                          <Space direction="horizontal" size={8}>
                            <Link to={`${TRANSACTIONS}/${item.id}`}>
                              <IconButton
                                size="xs"
                                icon={PencilHeavyIcon}
                                className="icon-button bg-blue"
                              />
                            </Link>
                            <IconButton
                              size="xs"
                              icon={CheckmarkIcon}
                              className="icon-button bg-green"
                              onClick={handleModalOpen(
                                item.app_status === 'new'
                                  ? 'CONFIRM_ORDER'
                                  : 'DELIVERY_ORDER_OTP',
                                item
                              )}
                            />
                            <IconButton
                              size="xs"
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
        <ModalResponsive.Header size="m" className="modal-responsive__header">
          <AlphaIcon size="m" colored={true} />
        </ModalResponsive.Header>
        <ModalResponsive.Content>
          {renderModalContent(modalType)}
        </ModalResponsive.Content>
      </ModalResponsive>
    </>
  );
};
