import React, { FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-location';
import { useTranslation } from 'react-i18next';
import AlphaIcon from 'arui-feather/icon/brand/bank-2449';
import { Typography } from '@alfalab/core-components/typography';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Space } from '@alfalab/core-components/space';
import { ModalResponsive } from '@alfalab/core-components/modal/responsive';
import { Spinner } from '@alfalab/core-components/spinner';

import {
  CheckmarkIcon,
  CrossHeavyIcon,
  PencilHeavyIcon
} from 'components/ui/icons';
import { useGetTransactionByIdQuery } from 'services/api/transactionAPI';
import { RootStateType } from 'redux/store';
import { selectStatusesList } from 'redux/slices/app-slice';
import { FINAL_ORDER_STATUSES } from 'utils/constants';
import { BuyerInfo, OrderComposition, ChangesHistory } from './partials';
import { ModalType } from '../Transactions/Transactions.model';
import {
  OrderCancel,
  DeliveryToCourier,
  PopConfirm,
  SmsConfirm
} from '../Transactions/partials';
import './Transaction.css';
import { OrderInfo } from './partials/OrderInfo';

const Transaction: FC = () => {
  const { params } = useMatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>();
  const statusList = useSelector((state: RootStateType) =>
    selectStatusesList(state)
  );
  const { data, isLoading, isSuccess } = useGetTransactionByIdQuery(params.id);

  const handleModalOpen = (type: ModalType) => (): void => {
    setOpen(true);
    setModalType(type);
  };

  const handleModalClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const renderModalContent = (type: ModalType) => {
    switch (type) {
      case 'CONFIRM_ORDER':
        return (
          <DeliveryToCourier
            id={data.id}
            merchantOrderId={data.merchant_order_id}
            title={t('transactions.modal.title.sendForDelivery')}
            text={t('transactions.modal.text.sendForDelivery')}
            successMessage={t('transactions.modal.title.sentForDelivery')}
          />
        );
      case 'CONFIRM_CANCEL':
        return (
          <OrderCancel
            id={data.id}
            merchantOrderId={data.merchant_order_id}
            title={t('transactions.modal.title.cancelOrder')}
            handleClose={handleModalClose}
          />
        );
      case 'DELIVERY_ORDER_OTP':
        return (
          <PopConfirm
            title={t('transactions.modal.title.sendForDelivery')}
            text={t('transactions.modal.text.sendForDelivery')}
            okText={t('button.send')}
            cancelText={t('button.cancel')}
          >
            <SmsConfirm
              order={data}
              successMessage={t('transactions.modal.success.delivered')}
            />
          </PopConfirm>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="absolute-center">
        <Spinner visible size="m" />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <>
        {data?.app_status && data?.merchant_order_id && (
          <Space direction="horizontal" size={8} className="mb-32">
            <Typography.Title tag="h2">
              {t('transaction.header.title')} №{data.id}
            </Typography.Title>
            {FINAL_ORDER_STATUSES.includes(data.app_status) && (
              <Space direction="horizontal" size={8}>
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
          </Space>
        )}
        <OrderInfo
          order={data}
          status={statusList[data.app_status]?.toUpperCase()}
        />
        <BuyerInfo order={data} />
        <OrderComposition />
        <ChangesHistory
          order={data}
          status={statusList[data.app_status]?.toUpperCase()}
        />
        <ModalResponsive open={open} onClose={handleModalClose} size="m">
          <ModalResponsive.Header size="m" className="modal-responsive__header">
            <AlphaIcon size="m" colored />
          </ModalResponsive.Header>
          <ModalResponsive.Content>
            {renderModalContent(modalType)}
          </ModalResponsive.Content>
        </ModalResponsive>
      </>
    );
  }

  return null;
};

export default Transaction;
