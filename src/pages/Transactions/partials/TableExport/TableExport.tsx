import React, { FC } from 'react';
import { Col, Container, Row } from 'react-grid-system';

import { FileCSVIcon, FilePDFIcon } from '../../../../components/ui/icons';
import { RangePicker } from '../../../../components/DatePicker';

export const TableExport: FC = () => {
  return (
    <Container fluid={true} className="table-export">
      <Row align="center">
        <Col
          xl={1}
          lg={2}
          md={2}
          sm={3}
          xs={12}
          className="transactions__btn-group p-0"
        >
          <button>
            <FileCSVIcon width={23} height={24} />
          </button>
          <div className="divider"></div>
          <button>
            <FilePDFIcon width={23} height={24} />
          </button>
        </Col>
        <Col
          xl={4}
          lg={5}
          md={6}
          sm={9}
          xs={12}
          offset={{ xl: 7, lg: 5, md: 4 }}
          className="p-0"
        >
          <RangePicker />
        </Col>
      </Row>
    </Container>
  );
};
