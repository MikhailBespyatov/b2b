import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-location';
import { TagButton } from 'arui-feather/tag-button';
import AlphaIcon from 'arui-feather/icon/brand/bank-2449';
import { Space } from '@alfalab/core-components/space';
import { IconButton } from '@alfalab/core-components/icon-button';
import { ModalResponsive } from '@alfalab/core-components/modal/responsive';

import { RootState } from '../../../../redux/store';
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
import {
  SendOrderOTP,
  DeliverOrderOTP,
  OrderStatus,
  ConfirmOrder
} from '../index';

export const OrderList: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('SEND_ORDER_OTP');
  const { data } = useSelector((state: RootState) => state.transaction);

  const handleModalOpen = (type: ModalType) => (e: any) => {
    e.stopPropagation();
    setOpen(true);
    setModalType(type);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleTableItemClick = (id: number) => () => {
    navigate({ to: `${TRANSACTIONS}/${id}` });
  };

  const renderModalContent = (type: ModalType) => {
    switch (type) {
      case 'SEND_ORDER_OTP':
        return <SendOrderOTP />;
      case 'CONFIRM_ORDER':
        return (
          <ConfirmOrder
            title={t('transactions.modal.title.confirmOrder', {
              orderNumber: '56784985'
            })}
          />
        );
      case 'CONFIRM_ACTION':
        return (
          <ConfirmOrder title={t('transactions.modal.title.confirmAction')} />
        );
      case 'DELIVERY_ORDER_OTP':
        return <DeliverOrderOTP />;
      case 'ORDER_CONFIRM_SUCCESS':
        return (
          <OrderStatus
            status="success"
            title={t('transactions.modal.success.confirmed')}
          />
        );
      case 'ORDER_DELIVERY_SUCCESS':
        return (
          <OrderStatus
            status="success"
            title={t('transactions.modal.success.delivered')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="overflowX">
        <table className="table">
          <thead>
            <tr>
              <td>{t('transactions.table.orderNumber')}</td>
              <td>{t('transactions.table.date')}</td>
              <td>{t('transactions.table.amount')}</td>
              <td>{t('transaction.data.phoneNumber')}</td>
              <td>{t('transactions.table.status')}</td>
              <td>{t('transactions.table.action')}</td>
            </tr>
          </thead>
          <tbody>
            {data.map(item => {
              return (
                <tr key={item.id} onClick={handleTableItemClick(item.id)}>
                  <td>{item.merchant_order_id}</td>
                  <td>{item.created_at}</td>
                  <td>{moneyFormatter.format(item.amount)}</td>
                  <td>{phoneNumberFormatter(item.phoneNumber)}</td>
                  <td>
                    {item.app_status && (
                      <TagButton
                        size="s"
                        className={`status status-${item.app_status}`}
                      >
                        {t(
                          `transactions.status.type.${item.app_status}`
                        ).toUpperCase()}
                      </TagButton>
                    )}
                  </td>
                  <td>
                    <Space direction="horizontal" size={8}>
                      <IconButton
                        size="xs"
                        icon={CheckmarkIcon}
                        className="icon-button bg-green"
                        onClick={handleModalOpen('SEND_ORDER_OTP')}
                      />
                      <IconButton
                        size="xs"
                        icon={PencilHeavyIcon}
                        className="icon-button bg-blue"
                        onClick={handleModalOpen('DELIVERY_ORDER_OTP')}
                      />
                      <IconButton
                        size="xs"
                        icon={CrossHeavyIcon}
                        className="icon-button bg-red"
                        onClick={handleModalOpen('CONFIRM_ORDER')}
                      />
                    </Space>
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
