import React, { FC, useState } from 'react';
import { useMatch } from 'react-location';
import { useTranslation } from 'react-i18next';
import AlphaIcon from 'arui-feather/icon/brand/bank-2449';
import { Typography } from '@alfalab/core-components/typography';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Space } from '@alfalab/core-components/space';
import { ModalResponsive } from '@alfalab/core-components/modal/responsive';
import { Spinner } from '@alfalab/core-components/spinner';

import {
  OrderHistory,
  BuyerInfo,
  OrderComposition,
  ChangesHistory
} from './partials';
import {
  CheckmarkIcon,
  CrossHeavyIcon,
  PencilHeavyIcon
} from '../../components/ui/icons';
import { useGetTransactionByIdQuery } from '../../services/api/transactionAPI';
import { ModalType } from '../Transactions/Transactions.model';
import {
  CancelOrder,
  ConfirmOrder,
  DeliverOrderOTP
} from '../Transactions/partials';
import './Transaction.css';

export const Transaction: FC = () => {
  const { params } = useMatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>();
  const { data, isLoading, isSuccess } = useGetTransactionByIdQuery(params.id);

  const handleModalOpen =
    (type: ModalType) =>
    (e: React.SyntheticEvent): void => {
      setOpen(true);
      setModalType(type);
    };

  const handleModalClose = () => {
    setOpen(false);
  };

  const renderModalContent = (type: ModalType) => {
    switch (type) {
      case 'CONFIRM_ORDER':
        return (
          <ConfirmOrder
            id={data.id}
            merchantOrderId={data.merchant_order_id}
            title={t('transactions.modal.title.confirmOrder', {
              orderNumber: data.id
            })}
          />
        );
      case 'CONFIRM_CANCEL':
        return (
          <CancelOrder
            id={data.id}
            merchantOrderId={data.merchant_order_id}
            title={t('transactions.modal.title.cancelOrder')}
          />
        );
      case 'DELIVERY_ORDER_OTP':
        return <DeliverOrderOTP order={data} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="absolute-center">
        <Spinner visible={true} size="m" />
      </div>
    );
  }

  return (
    <>
      {isSuccess && (
        <>
          {data?.app_status &&
            data.app_status !== 'cancelled' &&
            data?.merchant_order_id && (
              <Space direction="horizontal" size={8}>
                <Typography.Title tag="h2" className="transaction__title">
                  {t('transaction.header.title')} №{data.id}
                </Typography.Title>
                <IconButton
                  size="xs"
                  icon={PencilHeavyIcon}
                  className="icon-button bg-blue"
                />
                <IconButton
                  size="xs"
                  icon={CheckmarkIcon}
                  className="icon-button bg-green"
                  onClick={handleModalOpen(
                    data.app_status === 'new'
                      ? 'CONFIRM_ORDER'
                      : 'DELIVERY_ORDER_OTP'
                  )}
                />
                <IconButton
                  size="xs"
                  icon={CrossHeavyIcon}
                  className="icon-button bg-red"
                  onClick={handleModalOpen('CONFIRM_CANCEL')}
                />
              </Space>
            )}
          <OrderHistory order={data} />
          <BuyerInfo order={data} />
          <OrderComposition />
          <ChangesHistory order={data} />
          <ModalResponsive open={open} onClose={handleModalClose} size="m">
            <ModalResponsive.Header
              size="m"
              className="modal-responsive__header"
            >
              <AlphaIcon size="m" colored={true} />
            </ModalResponsive.Header>
            <ModalResponsive.Content>
              {renderModalContent(modalType)}
            </ModalResponsive.Content>
          </ModalResponsive>
        </>
      )}
    </>
  );
};
