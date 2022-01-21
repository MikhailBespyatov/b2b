import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-grid-system';
import { CalendarRange } from '@alfalab/core-components/calendar-range';

import { FileCSVIcon, FilePDFIcon } from '../../../../components/ui/icons';
import { useGetTransactionsQuery } from '../../../../services/api/transactionAPI';

export const TableExport: FC = () => {
  const { t } = useTranslation();
  const [skip, setSkip] = useState(true);
  const [dateCreate, setDateCreate] = useState<string | undefined>();
  const [deliveryDate, setDeliveryDate] = useState<string | undefined>();
  const { data, isLoading, isSuccess } = useGetTransactionsQuery(
    {
      dateCreate,
      deliveryDate
    },
    {
      skip
    }
  );

  const handleExportClick = (fileType: 'PDF' | 'CSV') => () => {
    setSkip(prev => !prev);
  };

  const headers = useMemo(() => {
    return [
      {
        key: 'id',
        name: t('transactions.table.orderNumber')
      },
      {
        key: 'created_at',
        name: t('transactions.table.date')
      },
      {
        key: 'amount',
        name: t('transactions.table.amount')
      },
      {
        key: 'phoneNumber',
        name: t('transaction.data.phoneNumber')
      },
      {
        key: 'app_status',
        name: t('transactions.table.status')
      }
    ];
  }, [t]);

  return (
    <Container fluid={true} className="table-export">
      <Row>
        <Col className="p-0">
          <div className="transactions__btn-group">
            <button onClick={handleExportClick('CSV')}>
              <FileCSVIcon width={23} height={24} />
            </button>
            <div className="divider" />
            <button onClick={handleExportClick('PDF')}>
              <FilePDFIcon width={23} height={24} />
            </button>
          </div>
        </Col>
        <Col
          xxl="content"
          xl="content"
          lg="content"
          md="content"
          sm="content"
          xs={12}
          className="p-0"
        >
          <CalendarRange
            calendarPosition="popover"
            onDateFromChange={({ value }) => setDateCreate(value)}
            onDateToChange={({ value }) => setDeliveryDate(value)}
          />
        </Col>
      </Row>
    </Container>
  );
};
