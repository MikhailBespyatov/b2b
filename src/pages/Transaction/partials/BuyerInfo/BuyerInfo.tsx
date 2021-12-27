import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-grid-system';
import { Label } from 'arui-feather/label';
import { Link } from 'arui-feather/link';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { Collapse } from '@alfalab/core-components/collapse';
import { ChevronForwardExtraMIcon } from '@alfalab/icons-glyph/ChevronForwardExtraMIcon';

export const BuyerInfo: FC = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <button
        type="button"
        className="collapsible"
        onClick={() => setExpanded(prev => !prev)}
      >
        {t('transaction.collapse.buyer')}
        {expanded ? <ChevronDownMIcon /> : <ChevronForwardExtraMIcon />}
      </button>
      <Collapse expanded={expanded} className="collapse">
        <Row>
          <Col lg={4} md={4} xs={12}>
            <div className="collapse__box-item">
              <Label className="bold_600">
                {t('transaction.data.surname')}:
              </Label>
              <span className="collapse__box-value">21.12.2020</span>
            </div>
          </Col>
          <Col lg={4} md={4} xs={12}>
            <div className="collapse__box-item">
              <Label className="bold_600">{t('transaction.data.name')}:</Label>
              <span className="collapse__box-value">asd</span>
            </div>
          </Col>
          <Col lg={4} md={4} xs={12}>
            <div className="collapse__box-item">
              <Label className="bold_600">
                {t('transaction.data.phoneNumber')}:
              </Label>
              <span className="collapse__box-value">
                <Link
                  text="+7 (727) 771-22-33"
                  url="tel:+7 (727) 771-22-33"
                  size="m"
                  view="blue"
                />
              </span>
            </div>
          </Col>
        </Row>
      </Collapse>
    </>
  );
};
