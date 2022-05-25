import React, { FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography } from '@alfalab/core-components/typography';
import { ModalResponsive } from '@alfalab/core-components/modal/responsive';
import { Spinner } from '@alfalab/core-components/spinner';
import { IconButton } from '@alfalab/core-components/icon-button';
import {
  CheckmarkIcon,
  CrossHeavyIcon,
  PencilHeavyIcon
} from 'components/ui/icons';
import { useGetTransactionByIdQuery } from 'services/api/transactionAPI';
import { RootStateType } from 'redux/store';
import { selectStatusesList } from 'redux/slices/app-slice';
import { FINAL_ORDER_STATUSES } from 'config/constants/status.constants';
import { BuyerInfo, OrderComposition, ChangesHistory } from './partials';
import { ModalType } from '../Transactions/Transactions.model';
import {
  OrderCancel,
  DeliveryToCourier,
  PopConfirm,
  SmsConfirm
} from '../Transactions/partials';
import './Transaction.css';

const Transaction: FC = () => {
  const { id } = useParams();

  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalType, setModalType] = useState<ModalType>();
  const statusList = useSelector((state: RootStateType) =>
    selectStatusesList(state)
  );
  const { data, isLoading, isSuccess } = useGetTransactionByIdQuery(id);
  const handleModalOpen = (type: ModalType) => (): void => {
    setOpen(true);
    setModalType(type);
  };

  const handleModalClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const renderModalContent = useCallback(
    (type: ModalType) => {
      if (data) {
        switch (type) {
          case 'CONFIRM_CANCEL':
            return (
              <OrderCancel
                id={data.orderInfo.id}
                merchantOrderId={data.orderInfo.merchant_order_id}
                orderStatus={data.orderInfo.app_status}
                amount={data.orderInfo.amount}
                title={t('transactions.modal.title.cancelOrder')}
                handleClose={handleModalClose}
              />
            );
          case 'DELIVERY_TO_COURIER':
            return (
              <DeliveryToCourier
                id={data.orderInfo.id}
                merchantOrderId={data.orderInfo.merchant_order_id}
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
                  order={data.orderInfo}
                  successMessage={t('transactions.modal.success.delivered')}
                />
              </PopConfirm>
            );
          default:
            return null;
        }
      }

      return null;
    },
    [data, t, handleModalClose]
  );

  if (isLoading) {
    return (
      <div className="absolute-center">
        <Spinner visible size="m" />
      </div>
    );
  }

  if (isSuccess && data) {
    return (
      <>
        {data.orderInfo?.app_status && data.orderInfo?.merchant_order_id && (
          <div className="mb-32 d-flex mobile-block">
            <Typography.Title tag="h2" className="mr-24">
              {t('transaction.header.title')} №{data.orderInfo.id}
            </Typography.Title>
            {FINAL_ORDER_STATUSES.includes(data.orderInfo.app_status) && (
              <>
                <IconButton
                  size="xxs"
                  className="mr-24"
                  icon={PencilHeavyIcon}
                  onClick={() => setIsEdit(prev => !prev)}
                >
                  {t('transaction.buttons.edit')}
                </IconButton>
                <IconButton
                  size="xxs"
                  className="mr-24"
                  icon={CheckmarkIcon}
                  onClick={handleModalOpen(
                    data.orderInfo.app_status === 'new'
                      ? 'DELIVERY_TO_COURIER'
                      : 'DELIVERY_TO_CLIENT'
                  )}
                >
                  {t('transaction.buttons.handOver')}
                </IconButton>
                <IconButton
                  size="xxs"
                  className="mr-24"
                  icon={CrossHeavyIcon}
                  onClick={handleModalOpen('CONFIRM_CANCEL')}
                >
                  {t('transaction.buttons.cancel')}
                </IconButton>
              </>
            )}
          </div>
        )}
        <BuyerInfo order={data.clientInfo} />
        <OrderComposition
          isEdit={isEdit}
          applicationDetail={data.applicationDetail}
        />
        <ChangesHistory
          order={data}
          status={statusList[data.orderInfo.app_status]?.toUpperCase()}
        />
        <ModalResponsive open={open} onClose={handleModalClose} size="m">
          <ModalResponsive.Header hasCloser />
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
