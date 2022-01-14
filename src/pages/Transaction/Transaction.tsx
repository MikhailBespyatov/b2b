import React, { FC, useState } from 'react';
import { useMatch } from 'react-location';
import { useTranslation } from 'react-i18next';
import { Typography } from '@alfalab/core-components/typography';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Space } from '@alfalab/core-components/space';
import { ModalResponsive } from '@alfalab/core-components/modal/responsive';
import AlphaIcon from 'arui-feather/icon/brand/bank-2449';

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
import { ConfirmOrder, DeliverOrderOTP } from '../Transactions/partials';

import './Transaction.css';

export const Transaction: FC = () => {
  const { params } = useMatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>();
  const { data } = useGetTransactionByIdQuery(params.id);

  const handleModalOpen =
    (type: ModalType) =>
    (e: React.SyntheticEvent): void => {
      setOpen(true);
      setModalType(type);
    };

  const handleModalClose = () => {
    setOpen(false);
  };

  const order = {
    id: 115,
    merchant_order_id: 11234,
    amount: 10000,
    app_status: 'delivered',
    phoneNumber: '77711271496',
    created_at: '2022-01-07T00:00:00.000233Z',
    otp_updated_at: '2022-01-13T09:54:08.498275Z'
  };

  const renderModalContent = (type: ModalType) => {
    if (order?.id) {
      switch (type) {
        case 'CONFIRM_CANCEL':
          return (
            <ConfirmOrder title={t('transactions.modal.title.confirmCancel')} />
          );
        case 'DELIVERY_ORDER_OTP':
          return <DeliverOrderOTP order={order} />;
        default:
          return null;
      }
    }
  };

  return (
    <>
      <Space direction="horizontal" size={8}>
        <Typography.Title tag="h2" className="transaction__title">
          {t('transaction.header.title')} №{params.id}
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
          onClick={handleModalOpen('DELIVERY_ORDER_OTP')}
        />
        <IconButton
          size="xs"
          icon={CrossHeavyIcon}
          className="icon-button bg-red"
          onClick={handleModalOpen('CONFIRM_CANCEL')}
        />
      </Space>
      <OrderHistory order={order} />
      <BuyerInfo order={order} />
      <OrderComposition />
      <ChangesHistory order={order} />
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
