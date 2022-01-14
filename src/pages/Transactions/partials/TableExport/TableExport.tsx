import React, { FC, useState } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { CalendarRange } from '@alfalab/core-components/calendar-range';

import { FileCSVIcon, FilePDFIcon } from '../../../../components/ui/icons';
import { useGetTransactionsQuery } from '../../../../services/api/transactionAPI';

export const TableExport: FC = () => {
  const [skip, setSkip] = useState(true);
  const [dateFrom, setDateFrom] = useState<undefined | string>();
  const [dateTo, setDateTo] = useState<undefined | string>();
  const { data } = useGetTransactionsQuery(
    { to: dateTo, from: dateFrom },
    {
      skip
    }
  );

  const handleExportClick = (fileType: 'PDF' | 'CSV') => () => {
    setSkip(prev => !prev);
  };

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
            onDateFromChange={({ value }) => setDateFrom(value)}
            onDateToChange={({ value }) => setDateTo(value)}
          />
        </Col>
      </Row>
    </Container>
  );
};
