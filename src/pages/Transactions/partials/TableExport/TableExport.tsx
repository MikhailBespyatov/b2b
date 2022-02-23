import React, { FC } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { CalendarRange } from '@alfalab/core-components/calendar-range';

import { FileCSVIcon, FilePDFIcon } from '../../../../components/ui/icons';

export const TableExport: FC = () => {
  const today = new Date();

  return (
    <Container fluid className="table-export">
      <Row>
        <Col className="p-0">
          <div className="transactions__btn-group">
            <button type="button">
              <FileCSVIcon width={23} height={24} />
            </button>
            <div className="divider" />
            <button type="button">
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
          <CalendarRange calendarPosition="popover" maxDate={today.getTime()} />
        </Col>
      </Row>
    </Container>
  );
};
